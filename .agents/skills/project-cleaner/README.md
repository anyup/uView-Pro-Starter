# project-cleaner · uView-Pro-Starter 项目精简工具

`project-cleaner` 是一个针对 **uView-Pro-Starter**（基于 uView Pro 组件的 uni-app Vue3 快速起步模板）的项目清理 Skill。它让你告别手动删文件、漏删关联导致编译失败的问题——只需按需勾选要清理的模块，它会**依赖感知**地连带动清理关联文件、先扫基线后复扫残留、逐级验证构建，保证清理后项目**可编译、可运行**。

- 语言：中文
- 形态：Skill（`SKILL.md` 主流程 + `references/` 依据 + `scripts/` 自动化脚本）
- 依赖：Node ≥ 18（脚本为 Node 原生 ESM，零第三方依赖、跨平台）

---

## 一、能清理什么

分级展示 11 个清理点（10 个执行模块），每项都有默认值，**只删你确认的**。

### A. 演示内容

| # | 清理点 | 默认 | 删除内容 |
|---|---|---|---|
| 1 | Demo 演示页 | 删 | `pages/home/` 下 5 个 demo（components/create/http/pinia/uview_intro）；同步移除 `home.vue` 入口数组、`pages.json` 路由、`demo.*` 词条 |
| 1 | about 二级页 | 删 | `pages/about/` 下 6 个子页（me/contributors/faq/guide/license/settings）；移除 `about.vue` 的 `menuList`/hero 跳转、路由、`about.*Page` 词条 |

### B. 工程能力

| # | 清理点 | 默认 | 删除内容 |
|---|---|---|---|
| 2 | 多语言 | 删 | 脚本将 `t('key')` 内联为硬编码中文后再删 `locale/`、`useLang`；保留 Pinia 时去掉 `setLocale` |
| 3 | 多主题 | 删 | 删自定义主题配置与 `main.ts` 主题挂载；保留 Pinia 时去掉 theme 方法；`App.root.vue` 的 `u-config-provider` 保留（承载全局 toast） |
| 4 | 自定义 TabBar | 留 | 删 tabbar store 与 `app-tabbar/`，`app-page.vue`/`home`/`about` 去 show-tabbar，**同步删除 `pages.json` 的 `tabBar` 配置**（含 `list`）；`theme.json` 不动 |
| 5 | Http 拦截器/请求层 | 留 | 删 `http.interceptor.ts` 与 httpPlugin；`$u.http` 仍可用 |
| 6 | Pinia 状态管理 | 留 | 删 `stores/`、挂载与 pinia 依赖；**自动连带删** pinia-demo 页与自定义 TabBar |

### C. 依赖与文档

| # | 清理点 | 默认 | 删除内容 |
|---|---|---|---|
| 7 | API 演示层 | 删 | 删 `api/`（`useUserApi` 当前无引用，安全） |
| 8 | 冗余依赖与死常量 | 删 | 卸未用的 `z-paging`，并同步 `tsconfig.json` 去 `z-paging/types` 类型引用；删 `constant.ts` 的 `GUIDE_*`/`ONBOARDING` |
| 9 | 文档同步 | 开 | 按已删模块刷新 `docs/ARCHITECTURE.md` 模块清单 |

### D. 维护

| # | 清理点 | 默认 | 行为 |
|---|---|---|---|
| 10 | 更新 uView Pro 组件库 | 更新 | **skill 不替你执行依赖安装**：用 `update-uview-pro.mjs --no-install` 同步 `constant.ts` 版本，并给出命令 `pnpm add uview-pro@latest` 交你自行运行；提示查看 CHANGELOG |

---

## 二、怎么用

### 触发方式

在 TRAE 对话中提及「清理 Starter 项目 / 精简项目 / 去除某某功能」等意图即可命中本 Skill；也可直接调用 `/project-cleaner`。运行时通常已位于被清理的 Starter 根目录。

### 交互流程（6 步）

1. **基线快照**：先跑残留扫描，记录清理前的残留状态（应为 0 或既定预期）。
2. **多选要清理的项**：按组展示上表，你勾选、确认；破坏性项（删目录/依赖/文件）会二次回执待删清单。
3. **冲突校验**：若勾选组合存在冲突（如「删 Pinia」却保留自定义 TabBar），Skill 会提示你二选一或自动连带，避免编译失败。
4. **按安全顺序执行**：先删内容、再收敛工程能力（详见 `references/architecture.md`），每步小结。
5. **复扫与构建验证**：去多语言先内联 → 复扫残留至 0 → `type-check` → `build:h5`。
6. **汇报**：列出「已删除 / 已修改」清单供你对账。

---

## 三、脚本速查

Skill 通过以下 Node 脚本完成自动化，你也可以在目标项目根手动运行：

```bash
# 1) 残留扫描：坏路由、悬空 import、残留符号、locale 缺键
node <skill>/scripts/check-residuals.mjs --dir .

# 2) 去多语言内联预览（--dry-run 只预览不动盘）
node <skill>/scripts/inline-cn-locale.mjs --dir . --dry-run
node <skill>/scripts/inline-cn-locale.mjs --dir .            # 确认后去掉 --dry-run 落地

# 3) 同步 uview-pro 版本号（默认不装依赖；升级请在正常终端自行 `pnpm add uview-pro@latest`）
node <skill>/scripts/update-uview-pro.mjs --no-install
```

> `<skill>` = 本 skill 所在目录，即 `.trae/skills/project-cleaner`。`--dir` 默认取 `CWD`。

### 残留符号按模块传入

`check-residuals.mjs` 默认**不**校验残留符号（基线上的合法符号会被误报），请按本次实际删除的模块显式传入：

```bash
# 去多语言 → 校验 useLocale / useLang 是否残留
--stale-symbols 'useLocale,useLang'

# 删 Pinia → 校验各 store 是否残留
--stale-symbols 'useCounterStore,useTabbarStore,useUserStore'

# 删冗余 → 校验死常量前缀是否残留
--stale-symbols 'GUIDE_'
```

---

## 四、验证与标准

清理后必须达成：

| 步骤 | 命令 | 期望 |
|---|---|---|
| 残留扫描 | `node <skill>/scripts/check-residuals.mjs --dir .` | 退出码 0 |
| 类型检查 | `pnpm run type-check` | 无类型错误 |
| 构建 | `pnpm run build:h5` | 构建成功 |
| 运行时抽查（可选） | `pnpm dev:h5` | 首页/关于页正常、文案无 `[missing]` |

完整验证清单见 `references/verification.md`，内置了常见报错来源定位（如删多语言后残留 `t(`、删 stores 后仍引用 `useXxxStore`）。

---

## 五、目录结构

```
project-cleaner/
├── SKILL.md                       # 主流程：触发 + 交互 + 模块清单 + 冲突不变量 + 验证
├── README.md                      # 本文档
├── references/
│   ├── architecture.md            # 模块耦合矩阵 + 冲突不变量 + 安全删除顺序
│   ├── locale-inline.md           # 页面→词条映射 + t() 内联要点 + 删页删词条清单
│   └── verification.md            # 验证清单 + 已知基线例外
└── scripts/
    ├── check-residuals.mjs        # 残留/坏路由/悬空 import/locale 缺键扫描
    ├── inline-cn-locale.mjs       # t('key') → 硬编码中文（含 {var} 插值，区分 template/script）
    └── update-uview-pro.mjs       # 升级组件库 + 同步版本 + install/build
```

---

## 六、注意事项

- **备份优先**：正式清理前建议先备份项目（或让 Skill 在副本演练一次再落库）。
- **破坏性二次确认**：删目录/依赖/文件前会回执清单，请核对。
- **`theme.json` 不动**：它属于 uni-app 原生主题，与 uView Pro 自定义多主题解耦，去「多主题」不改它。
- **`home.vue`/`about.vue` 坏链接**：指向已删 demo/子页的入口条目会同步移除（含现存坏链接 `/pages/home/createuni-demo`）。
- **已知基线例外**：真实 Starter 的 `uview-intro.vue:96` 存在 `t('guidePage.steps.install')` 缺前缀的既有 bug（`about.guidePage.steps.install`），skill 会自动示范处理，不用你管（详见 `references/verification.md`）。
- **更新组件库可能有 Breaking Changes**：查看 CHANGELOG 后再决定是否保留旧用法。
- **不替你执行依赖安装**：在当前环境跑 `pnpm add` 易被沙箱拦住、或被迫生成临时缓存目录。skill 只把 `constant.ts` 版本同步为最新并给出命令，实际升级由你在自己的正常终端运行 `pnpm add uview-pro@latest`。

---

## 七、典型场景

1. **只想保留骨架**：勾选 Demo 演示页 + about 二级页 + 多语言 + 多主题 + API 层 + 冗余依赖 → 得到一个干净的纯业务工程。
2. **不用第三方状态库**：勾选 Pinia（会自动连带删 pinia-demo 与自定义 TabBar）。
3. **彻底去底部 Tab 栏**：勾选自定义 TabBar → 同步删 `pages.json` 的原生 `tabBar` 配置；`theme.json` 不动。
4. **日常维护**：只跑「更新 uView Pro」，同步 `constant.ts` 版本号，并拿到升级命令 `pnpm add uview-pro@latest` 在正常终端执行。
