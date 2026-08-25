#!/usr/bin/env node
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/**
 * check-residuals.mjs — uView-Pro-Starter 清理后的残留引用检查
 *
 * 用途：删除页面/模块后，扫描是否遗漏关联（坏路由、悬空 import、引用已删
 * 模块的符号、locale 缺失键）。任何「红线」命中则以非 0 退出码返回。
 *
 * 用法：
 *   node check-residuals.mjs [--dir <项目根，默认 CWD>]
 *   node check-residuals.mjs --dir . --stale-symbols 'useCounterStore,useLang'
 *
 * 设计：Node 原生 + 零第三方依赖 + 跨平台。
 */
import fs from 'node:fs'
import path from 'node:path'

// ---------- 参数 ----------
const args = process.argv.slice(2)
function arg(name, fallback = '') {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] ?? fallback : fallback
}
const root = path.resolve(arg('--dir', '.'))
// 默认空：基线态这些符号仍合法存在；应由调用方按"本次实际删除的模块"显式传入，
// 避免把尚未清理的合法符号误报为残留。
const staleSymbols = arg('--stale-symbols', '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

const srcDir = path.join(root, 'src')
const problems = []

// ---------- 工具 ----------
function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'uni_modules') continue
      walk(p, ext, out)
    }
    else if (ext.some(x => e.name.endsWith(x))) {
      out.push(p)
    }
  }
  return out
}

function existCandidates(base, target) {
  // '@/x' -> src/x[.ts|.vue|/index.ts|/index.vue]
  const tries = [
    target,
    `${target}.ts`,
    `${target}.vue`,
    `${target}.mjs`,
    path.join(target, 'index.ts'),
    path.join(target, 'index.vue'),
  ]
  return tries.some(t => fs.existsSync(t))
}

function resolveAtImport(imp) {
  const t = imp.replace(/^@\//, '')
  return existCandidates(srcDir, path.join(srcDir, t))
    ? null
    : `@/${t}` // 悬空
}

function flattenLocale(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) flattenLocale(v, key, out)
    else out[key] = String(v)
  }
  return out
}

// ---------- 1) pages.json 路由 ----------
const pagesJson = path.join(srcDir, 'pages.json')
if (fs.existsSync(pagesJson)) {
  let cfg
  try { cfg = JSON.parse(fs.readFileSync(pagesJson, 'utf8')) }
  catch { problems.push(`[路由] 无法解析 ${pagesJson}`) }
  if (cfg) {
    for (const p of [...(cfg.pages || []), ...(cfg.subPackages || {}).flatMap?.(sp => sp.pages || []) || []]) {
      const pth = p.path || p
      const file = path.join(srcDir, `${pth}.vue`)
      if (!fs.existsSync(file)) problems.push(`[路由] pages.json 指向不存在的页面: ${pth}.vue`)
    }
  }
}

// ---------- 2) src 内 '@/...' import 悬空 ----------
for (const file of walk(srcDir, ['.vue', '.ts'])) {
  let code
  try { code = fs.readFileSync(file, 'utf8') }
  catch { continue }

  const aliasRe = /from\s+['"]((?:@\/).*?)['"]/g
  let m
  while ((m = aliasRe.exec(code))) {
    const dangle = resolveAtImport(m[1])
    if (dangle) problems.push(`[import] ${rel(file)} 引用了不存在的模块: ${dangle}`)
  }
}

// ---------- 3) 已删模块符号残留 ----------
for (const file of walk(srcDir, ['.vue', '.ts'])) {
  const code = fs.readFileSync(file, 'utf8')
  for (const sym of staleSymbols) {
    // 以 '_' 结尾的符号按前缀匹配（如 GUIDE_ 命中 GUIDE_TABS_KEY），其余词边界匹配
    const prefix = sym.endsWith('_')
    const r = prefix
      ? new RegExp(sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      : new RegExp(`\\b${sym}\\b`, 'g')
    let mt
    while ((mt = r.exec(code))) {
      const line = code.slice(0, mt.index).split('\n').length
      problems.push(`[残留] ${rel(file)}:${line} 仍引用待清理符号「${sym}」`)
    }
  }
}

// ---------- 4) locale 缺失键（若 locale/ 仍保留） ----------
const localeDir = path.join(srcDir, 'locale', 'lang')
const cnFile = path.join(localeDir, 'zh-CN.json')
if (fs.existsSync(cnFile)) {
  let dict = {}
  try { dict = flattenLocale(JSON.parse(fs.readFileSync(cnFile, 'utf8'))) }
  catch { problems.push('[locale] 无法解析 zh-CN.json') }

  const tRe = /(?<![A-Za-z0-9_$])t\(\s*['"`]([^'"`]+)['"`]/g
  for (const file of walk(srcDir, ['.vue', '.ts'])) {
    const code = fs.readFileSync(file, 'utf8')
    let mt
    while ((mt = tRe.exec(code))) {
      const key = mt[1]
      if (key.startsWith('theme.')) continue // 动态键，跳过
      if (!(key in dict)) {
        const line = code.slice(0, mt.index).split('\n').length
        problems.push(`[locale] ${rel(file)}:${line} 引用缺失词条: t('${key}')`)
      }
    }
  }
}

// ---------- 汇总 ----------
function rel(p) { return path.relative(root, p).replace(/\\/g, '/') }

if (problems.length) {
  console.error(`\n发现 ${problems.length} 处残留:`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error('\n请根据 references/architecture.md 的不变量补齐后重跑。')
  process.exit(1)
}
else {
  console.log('✔ 未发现残留，可继续构建验证。')
  process.exit(0)
}
