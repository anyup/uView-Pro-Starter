#!/usr/bin/env node
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/**
 * update-uview-pro.mjs — 将 uView Pro 组件库升级到最新版并保持版本元数据同步。
 *
 * 功能：
 *  1)（可选，默认不执行）pnpm add uview-pro@latest——依赖安装建议在用户自己的正常终端运行；
 *  2) 读取 node_modules/uview-pro/package.json 或 package.json 中的新版本号；
 *  3) 回写 src/common/constant.ts 的 UVIEW_PRO_INFO.version；
 *  4) 提示查阅 CHANGELOG 以判断 breaking changes，并提示构建验证。
 *
 * 用法：
 *   node update-uview-pro.mjs [--dir <项目根，默认 CWD>] [--install] [--yes]
 *   默认仅同步版本号（不执行 install）；加 --install 才会在当前环境下安装依赖。
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
function arg(name, fallback = '') {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] ?? fallback : fallback
}
const root = path.resolve(arg('--dir', '.'))
const doInstall = args.includes('--install') ? true : false
const yes = args.includes('--yes')

const pkgPath = path.join(root, 'package.json')
if (!fs.existsSync(pkgPath)) {
  console.error(`未找到 package.json（${root}），请以项目根运行。`)
  process.exit(1)
}

// ---------- 1) 更新依赖 ----------
if (doInstall) {
  console.log('▶ pnpm add uview-pro@latest')
  const r = spawnSync('pnpm', ['add', 'uview-pro@latest'], { cwd: root, stdio: 'inherit' })
  if (r.status !== 0) {
    console.error('\n依赖安装失败，已停止（本脚本默认仅同步版本号，不需要安装）。')
    process.exit(r.status ?? 1)
  }
}
else {
  console.log('（不执行安装——默认仅同步版本号）')
  console.log('  ℹ 升级 uview-pro 请在您的正常终端运行： pnpm add uview-pro@latest')
}

// ---------- 2) 读取新版本 ----------
let version = null
const installedPkg = path.join(root, 'node_modules', 'uview-pro', 'package.json')
if (fs.existsSync(installedPkg)) {
  try { version = JSON.parse(fs.readFileSync(installedPkg, 'utf8')).version } catch { /* ignore */ }
}
if (!version) {
  try { version = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).dependencies['uview-pro'] } catch { /* ignore */ }
}
console.log(`\n当前 uview-pro 版本: ${version ?? '未知'}`)

// ---------- 3) 回写 constant.ts ----------
const constPath = path.join(root, 'src', 'common', 'constant.ts')
if (version && fs.existsSync(constPath)) {
  let code = fs.readFileSync(constPath, 'utf8')
  const next = code.replace(
    /(version:\s*')([^']*)('\s*,\s*\n\s*buildTime:)/,
    (whole, pre, _old, after) => `${pre}${version}${after}`,
  )
  if (next !== code) {
    if (yes) {
      fs.writeFileSync(constPath, next)
      console.log(`✔ 已同步 ${rel(constPath)} 的 UVIEW_PRO_INFO.version=${version}`)
    }
    else {
      console.log(`[待确认] 将把 ${rel(constPath)} 中 UVIEW_PRO_INFO.version 更新为 ${version}；加 --yes 自动写入。`)
    }
  }
  else {
    console.log('UVIEW_PRO_INFO.version 未匹配，请人工核对 constant.ts。')
  }
}
else {
  console.log('未找到 constant.ts，跳过版本回写。')
}

// ---------- 4) 提示 ----------
console.log('\n后续建议：')
console.log('  - 查看 CHANGELOG：node_modules/uview-pro/CHANGELOG.md（判断 breaking changes）')
console.log('  - 运行版本同步验证：node check-residuals.mjs --dir .')
console.log('  - 构建验证：pnpm run type-check && pnpm run build:h5')

function rel(p) { return path.relative(root, p).replace(/\\/g, '/') }
