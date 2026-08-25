#!/usr/bin/env node
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/**
 * inline-cn-locale.mjs — 去多语言时，把 t('key') 内联为 zh-CN 硬编码中文。
 *
 * 设计：
 *  - 词源：src/locale/lang/zh-CN.json（展平 path→中文）；
 *  - 按 <template>/<script> 语境分别处理插值变量；
 *  - 支持插值参数 t('a.b', { name }) 与动态键 t(`theme.${k}`)；
 *  - 内联后移除不再使用的 useLocale 导入与 { t } 解构。
 *
 * 用法：
 *   node inline-cn-locale.mjs [--dir <项目根，默认 CWD>] [--dry-run] [--only <glob 子串>]
 */
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
function arg(name, fallback = '') {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] ?? fallback : fallback
}
const root = path.resolve(arg('--dir', '.'))
const DRY = args.includes('--dry-run')
const only = arg('--only', '')
const srcDir = path.join(root, 'src')

// ---------- 词源 ----------
const cnPath = path.join(srcDir, 'locale', 'lang', 'zh-CN.json')
let zhCN = {}
function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out)
    else out[key] = String(v)
  }
  return out
}
try { zhCN = flatten(JSON.parse(fs.readFileSync(cnPath, 'utf8'))) }
catch (e) {
  console.error(`无法读取词源 ${cnPath}:`, e.message)
  process.exit(1)
}

// ---------- 工具 ----------
function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'uni_modules') walk(p, ext, out) }
    else if (ext.some(x => e.name.endsWith(x))) out.push(p)
  }
  return out
}

const esc = s => s.replace(/'/g, '\\\'')
// 匹配 t('key', { name: expr }) / t("key") / t(`key`)
const callRe = /(?<![A-Za-z0-9_$])t\(\s*(['"`])(.*?)\1\s*(?:,\s*(\{[^{}]*\}))?\s*\)/g

function parseInterp(argsStr) {
  // 返回 { placeholders: Map<name, expr> }
  const map = new Map()
  if (!argsStr) return map
  const m = argsStr.match(/\{\s*([A-Za-z_$][\w$]*)(?:\s*:\s*([\s\S]*?))?\s*\}/)
  if (m) map.set(m[1], (m[2] || m[1]).trim())
  return map
}

// 将含 {name} 的中文 value + 插值变量表，拼成 JS/template 可用的表达式
function buildExpr(value, interp, inTemplate) {
  if (interp.size === 0) return `'${esc(value)}'`
  const parts = []
  const re = /\{([A-Za-z_$][\w$]*)\}/g
  let last = 0
  let mt
  while ((mt = re.exec(value))) {
    if (mt.index > last) parts.push(`'${esc(value.slice(last, mt.index))}'`)
    const expr = interp.get(mt[1])
    parts.push(expr === undefined ? `'${esc(mt[0])}'` : `(${expr})`)
    last = mt.index + mt[0].length
  }
  if (last < value.length) parts.push(`'${esc(value.slice(last))}'`)
  return parts.join(' + ')
}

// ---------- 分段语境 ----------
function splitContext(code) {
  // 返回函数：位置 pos 处于 'template' / 'script' / 'other'
  const ranges = { template: [], script: [] }
  const tagged = [
    ['template', /<template[^>]*>/g, /<\/template>/g],
    ['script', /<script[^>]*>/g, /<\/script>/g],
  ]
  for (const [k, openRe, closeRe] of tagged) {
    const opens = [...code.matchAll(openRe)], closes = [...code.matchAll(closeRe)]
    const n = Math.min(opens.length, closes.length)
    for (let i = 0; i < n; i++) ranges[k].push([opens[i].index + opens[i][0].length, closes[i].index])
  }
  return function ctx(pos) {
    for (const k of ['template', 'script']) {
      for (const [s, e] of ranges[k]) if (pos >= s && pos <= e) return k
    }
    return 'other'
  }
}

// ---------- import / 解构清理 ----------
function cleanupImports(code) {
  // 是否还有独立的 t() 调用？排除 linear-gradient(/showToast 等非翻译调用
  const tCall = /(?<![A-Za-z0-9_$])t\s*\(/.test(code)
  if (!tCall) {
    // 不再使用 t：移除 const { t } = useLocale()
    code = code.replace(/const\s*\{\s*t\s*\}\s*=\s*useLocale\(\)\s*;?\n?/g, '')
  }
  // useLocale 是否仍被调用（解构已删则此处为 false）
  const ucCall = /(?<![\w$])useLocale\s*\(/.test(code)
  if (!ucCall) {
    code = code.replace(
      /import\s*\{([^}]*)\}\s*from\s*['"]uview-pro['"]/g,
      (whole, names) => {
        const kept = names.split(',').map(s => s.trim()).filter(Boolean)
          .filter(n => !/^useLocale$/.test(n.replace(/^type\s+/, '')))
        return kept.length ? `import { ${kept.join(', ')} } from 'uview-pro'` : ''
      })
  }
  return code
}

// ---------- 处理单个文件 ----------
function processFile(file) {
  let code = fs.readFileSync(file, 'utf8')
  const ctx = splitContext(code)
  let changed = false
  const usedKeys = new Set()

  code = code.replace(callRe, (whole, quote, key, argsStr, offset) => {
    // offset 是 replace 引擎提供的本次匹配起始位置（勿用 callRe.lastIndex，会被引擎推进不可靠）
    const context = ctx(offset)
    usedKeys.add(key)

    let value = zhCN[key]
    if (value === undefined) {
      // 动态键 theme.xxx
      const m = key.match(/^theme\.([\s\S]+)/)
      if (m) {
        const dyn = m[1].trim()
        const lookup = `('theme.' + ${dyn})`
        return `t(${lookup})` // 保留 t，交由调用方静态化或人工处理
      }
      // 未知键：保留原样不要破坏编译
      return whole
    }

    const interp = parseInterp(argsStr)
    if (context === 'template') {
      changed = true
      return buildExpr(value, interp, true)
    }
    if (context === 'script') {
      changed = true
      return buildExpr(value, interp, false)
    }
    return whole // other（如 style/comment 内文本，罕见）
  })

  code = cleanupImports(code)

  const stillChanged = code !== fs.readFileSync(file, 'utf8')
  if (changed || stillChanged) {
    if (DRY) {
      console.log(`[dry-run] 将改写 ${rel(file)}`)
    }
    else {
      fs.writeFileSync(file, code)
      console.log(`✔ 改写 ${rel(file)}`)
    }
  }
  return { file, usedKeys: [...usedKeys] }
}

function rel(p) { return path.relative(root, p).replace(/\\/g, '/') }

// ---------- 主流程 ----------
const files = walk(srcDir, ['.vue', '.ts'])
  .filter(f => (only ? f.includes(only) : true))
const allKeys = new Set()
for (const f of files) {
  if (f.endsWith('zh-CN.json') || f.endsWith('en-US.json')) continue
  const r = processFile(f)
  r.usedKeys.forEach(k => allKeys.add(k))
}

console.log(`\n扫描 ${files.length} 个文件。`)
console.log(DRY
  ? `（本次为 --dry-run，未写入任何文件；确认后去掉该参数再执行。）`
  : '内联完成。')
console.log('\n提示：')
console.log('  - 动态键 t(`theme.${k}`) 与未知键保持 t() 调用，请结合 references/locale-inline.md 静态化或人工确认。')
console.log('  - 内联后请运行: node check-residuals.mjs --dir . 复核残留。')
