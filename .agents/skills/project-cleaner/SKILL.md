---
name: "project-cleaner"
description: "uView-Pro-Starter 项目精简工具。清理 Demo 演示页、about 二级页、多语言、多主题、自定义多 TabBar、Http 拦截器、Pinia 状态管理、API 演示层、冗余依赖与死常量，同步架构文档，并更新 uView Pro 组件库。依赖感知：清理时校验关联文件、冲突组合自动连带，先扫描基线、后复扫残留，确保项目可编译可运行。"
---

# Project Cleaner

uView-Pro-Starter 项目清理工具。删除部分演示页/工程能力时，**不遗漏关联文件、保证项目正常运行**。

> 目标项目根：skill 运行时通常已 `cd` 到被清理的 Starter 根目录；目标用 `--dir <path>` 覆盖，缺失时默认 `CWD`。
> 脚本一律 Node 原生 `.mjs`（零第三方依赖、跨平台）。

## 交互流程

1. **基线快照**：运行 `node <skill>/scripts/check-residuals.mjs --dir .` 记录当前残留为 0（或既定预期），作为清理前后对比基线。
2. **展示选项并让用户多选**：按组列出清理能力（见下表），标注默认「保留/删除」，**仅对用户确认删除的项执行**；向用户二次确认「删除目录/依赖/文件」类破坏性项（回执将删文件清单）。
3. **冲突校验**：按 `references/architecture.md` 的冲突不变量校验勾选组合；冲突时提示用户二选一或自动连带（如「删 Pinia」自动连带「删 demo 页中的 pinia-demo」与「删自定义 TabBar」）。
4. **按安全顺序执行**：顺序见 `references/architecture.md` §4（先删内容、再收敛工程能力），每步小结。
5. **复扫与构建验证**：`inline-cn-locale.mjs`（若去多语言）→ `check-residuals.mjs` 复扫至 0 → `type-check` → `build:h5`（见 `references/verification.md`）。
6. **汇报**：列出「已删除 / 已修改」清单供用户对账。

## 可清理项（11 个清理点 / 10 个执行模块）

> 模块 1 含「Demo 演示页」与「about 二级页」两个清理点，向用户勾选时可拆开显示。

### A. 演示内容
| # | 清理点 | 默认 | 关键动作 |
|---|---|---|---|
| 1 | Demo 演示页 | 删 | 删 `pages/home/` 下 5 个 demo；`home.vue` 的 `projectCards`/`features` 入口同步移除（含坏链接 `/pages/home/createuni-demo`）；`pages.json` 去路由；裁剪 `demo.*` 词条 |
| 1 | about 二级页 | 删 | 删 `pages/about/` 下 6 个子页（me/contributors/faq/guide/license/settings）；`about.vue` 的 `menuList`/hero 跳转移除，保留 `infoList`/`chatList`/`copyLink`；`pages.json` 去路由；裁剪 `about.*Page` 词条 |

### B. 工程能力
| # | 清理点 | 默认 | 关键动作 |
|---|---|---|---|
| 2 | 多语言 | 删 | 先跑 `inline-cn-locale.mjs` 内联 `t()` 为中文，再删 `locale/`、`composables/useLang.ts`、`composables/index.ts`、`main.ts` locale 配置；保留 Pinia 时 `stores/user.ts` 去 language 偏好与 `setLocale`。`theme.*` 动态键需人工静态化 |
| 3 | 多主题 | 删 | 删 `common/uview-pro.theme.ts`、`main.ts` theme 配置；保留 Pinia 时 `stores/user.ts` 去 `updateTheme`/`useTheme`/`setDarkMode`；`App.root.vue` **保持不动**（`u-config-provider` 承载全局 `<u-toast global/>`） |
| 4 | 自定义 TabBar | 留 | 删 `stores/tabbar.ts`、`components/app-tabbar/`；`app-page.vue` 去 show-tabbar 分支、`home/about` 去 `show-tabbar`；**同步删除 `pages.json` 的整个 `tabBar` 配置**（含 `list`）。`theme.json` 不动 |
| 5 | Http 拦截器/请求层 | 留 | 删 `common/http.interceptor.ts`、`main.ts` httpPlugin；`$u.http` 仍可用（组件库内置） |
| 6 | Pinia 状态管理 | 留 | 删 `stores/`、`main.ts` store 挂载、卸 `pinia`/`pinia-plugin-persistedstate` 依赖；**自动连带删 `pinia-demo` 页与自定义 TabBar**（app-tabbar 强依赖 store） |

### C. 依赖与文档
| # | 清理点 | 默认 | 关键动作 |
|---|---|---|---|
| 7 | API 演示层 | 删 | 删 `api/`（`useUserApi` 当前无任何页面引用，安全） |
| 8 | 冗余依赖与死常量 | 删 | 卸 `z-paging`（未用）并同步 `tsconfig.json` 去 `z-paging/types` 类型引用；删 `constant.ts` 的 `GUIDE_*`/`ONBOARDING`（无引用） |
| 9 | 文档同步 | 开 | 按已删模块更新 `docs/ARCHITECTURE.md` 模块清单 |

### D. 维护
| # | 清理点 | 默认 | 关键动作 |
|---|---|---|---|
| 10 | 更新 uView Pro 组件库 | 更新 | **skill 不替你执行依赖安装**。用 `update-uview-pro.mjs --no-install` 把 `constant.ts` 的版本同步为最新，并给出命令 `pnpm add uview-pro@latest`，交你在自己的正常终端运行；提示查看 CHANGELOG 判断 breaking changes |

## 依赖联动（冲突不变量摘要）

违反将导致不可编译/行为异常。完整矩阵与顺序见 `references/architecture.md`。

- **删 Pinia ⟹ 连带删**：`pinia-demo` 页、`stores/` 全部（含 `tabbar.ts`）、`app-tabbar/`、`main.ts` 的 store 挂载、pinia 依赖。
- **删多语言 ⟹ 先内联 `t()`** 再删 locale 布局；保留 Pinia 则 `stores/user.ts` 去 `setLocale`。
- **删多主题 ⟹ `stores/user.ts`（若保留）去 theme 方法**；`App.root.vue` 不动。
- **删页 ⟹ 同步裁剪 locale 词条**（`demo.*`、`about.*Page`），但保留页引用的 `common.*`/`home.*`/`about.*` 基础键不得误删。
- **删冗余依赖（`z-paging`）⟹ 同步 `tsconfig.json`**：`compilerOptions.types` 移除 `z-paging/types`，否则 `vue-tsc --noEmit` 报 `Cannot find type definition file for 'z-paging/types'`。
- **删自定义 TabBar ⟹ 同步删原生 tabBar**：`pages.json` 移除整个 `tabBar` 块（含 `list`）。`theme.json` 不动——其中 `@tab*` 等变量属 uni-app 原生主题，不随删 TabBar 改动。
- **`theme.json` 不动**：它是 uni-app 原生页面/原生 tabbar 主题（`@bgColor`、`@tab*` 等），与 uView Pro 自定义主题解耦；删原生 `tabBar` 也不改动其中的变量。

## 脚本用法

```bash
node <skill>/scripts/check-residuals.mjs --dir .             # 残留扫描（路由/悬空 import/残留符号/locale 缺键）
node <skill>/scripts/inline-cn-locale.mjs --dir . --dry-run  # 去多语言预览（--dry-run 不动盘，确认后去掉）
node <skill>/scripts/update-uview-pro.mjs --no-install   # 仅同步 constant.ts 版本号（默认不替你执行 install；升级由你 `pnpm add uview-pro@latest` 完成）
```

注意：脚本默认不校验残留符号（基线态合法符号会被误报）；按本次删除的模块显式追加，例如去多语言传 `--stale-symbols 'useLocale,useLang'`，删 Pinia 传 `--stale-symbols 'useCounterStore,useTabbarStore,useUserStore'`，删冗余传 `--stale-symbols 'GUIDE_'`。

## 验证

见 `references/verification.md`：残留扫描为 0 → `pnpm run type-check` → `pnpm run build:h5` →（可选）`pnpm dev:h5` 抽查首页/关于页。

## 注意事项

- 破坏性操作（删目录/依赖/文件）执行到该步前**必须向用户二次确认**。
- 清理前先 `check-residuals.mjs` 记基线，清理后复扫，杜绝遗漏。
- `home.vue`/`about.vue` 指向已删入口的数组条目必须同步移除（现存坏链接 `/pages/home/createuni-demo` 一并清）。
- 更新组件库可能引入 Breaking Changes，先看 CHANGELOG。
- **不替你执行依赖安装**：在当前环境跑 `pnpm add` 易被沙箱拦住或需临时缓存目录；skill 只把 `constant.ts` 版本同步为最新并给出命令，实际升级由你在自己的正常终端运行 `pnpm add uview-pro@latest`。
- settings.vue 是语言/主题切换唯一入口且属于 about 二级页；删「demo+二级页」后其入口随之消失，主题/语言剔除不必再单独改 settings。
