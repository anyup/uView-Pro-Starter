# 模块耦合架构（references/architecture.md）

> project-cleaner 的执行依据：**谁用谁、删谁需连删谁、冲突不变量、安全删除顺序**。
> 本文件描述的收割对象是 `uView-Pro-Starter`（Vue3 + uni-app + TS + Pinia），路径均相对该仓库根。

---

## 1. 目录速览

```
src/
├── main.ts            # 入口：注册 uViewPro{theme,locale} + httpPlugin + Pinia store
├── App.root.vue       # <u-config-provider><slot/><u-toast global/></u-config-provider>
├── App.vue  manifest.json  pages.json  theme.json  uni.scss
├── common/            # constant.ts、http.interceptor.ts、style.scss、uview-pro.theme.ts
├── api/               # index.ts、useUserApi.ts（当前无任何页面引用）
├── components/        # app-page/、app-tabbar/
├── composables/       # index.ts、useLang.ts
├── locale/            # index.ts、lang/{zh-CN,en-US}.json
├── stores/            # index.ts、counter.ts、tabbar.ts、user.ts
└── pages/
    ├── home/          # home + components/create/http/pinia/uview-intro 5 个 demo
    └── about/         # about + about-me/contributors/faq/guide/license/settings
```

> `theme.json` 是 uni-app **原生页面/原生 tabbar** 主题（`@bgColor` 等），与 uView Pro 自定义多主题（`common/uview-pro.theme.ts`）**解耦**；去「多主题」不改动它，删原生 `tabBar` 也不改动其中任何变量。

---

## 2. 模块耦合矩阵

| 模块 | 关键文件 | 依赖它的文件 / 它的依赖 |
|---|---|---|
| 多语言 locale | `locale/`、`composables/useLang.ts` | 依赖：几乎所有页面 `useLocale().t('…')`；`stores/user.ts`（`setLocale`）；`settings.vue`（`useLang` 切语言） |
| 多主题 | `common/uview-pro.theme.ts` | 依赖：`main.ts`（theme 配置）、`stores/user.ts`（`useTheme`/`setDarkMode`）、`settings.vue`；`App.root.vue` 的 `u-config-provider` 保留即可 |
| 自定义 TabBar | `stores/tabbar.ts`、`components/app-tabbar/`、`app-page.vue:showTabbar`、`pages.json` 的 `tabBar` 块 | 依赖：`app-tabbar` **强依赖 Pinia**（`useTabbarStore`）；`app-page` 通过 `show-tabbar` 渲染；`home/about` 传 `show-tabbar`；原生 `tabBar` 引用 `theme.json` 变量，但删它以 `pages.json` 为准，`theme.json` 不动 |
| Http 拦截器 | `common/http.interceptor.ts` | 依赖：`main.ts`（httpPlugin）；`http-demo` 用 `$u.http`（组件库内置，删拦截器后仍可用）；`api/useUserApi` 用 uview-pro `http`（独立） |
| Pinia | `stores/`、`main.ts` | 依赖：`pinia-demo.vue`、`app-tabbar`（tabbar store）、`stores/user.ts`（并依赖 theme/locale） |
| Demo 页 + about 二级页 | `pages/home/*demo*`、`pages/about/*`（除 about.vue） | 依赖：`home.vue` 的 `projectCards`/`features` 数组、`about.vue` 的 `menuList`/hero 跳转、`pages.json` 路由、locale 的 `demo.*` 与 `about.*Page` |
| API 演示层 | `api/` | 当前**无任何页面引用**（安全可删）；用法参照 `http` |
| 冗余依赖 | `z-paging`（package.json，未用）、`tsconfig.json` 的 `z-paging/types`、`constant.ts` 的 `GUIDE_*`/`ONBOARDING`（无引用） | 卸 `z-paging` 后若漏删 tsconfig 的 `z-paging/types`，`vue-tsc` 报 `Cannot find type definition file` |
| 文档 | `docs/ARCHITECTURE.md` | 跟随实际模块增减刷新模块清单 |

---

## 3. 冲突不变量（必须满足，否则项目不可编译/行为异常）

- **删 Pinia ⟹ 必须连带删**：`pinia-demo.vue` 页、`stores/` 全部（含 `tabbar.ts`）、`components/app-tabbar/`；`main.ts` 去 `app.use(store)`；`package.json` 卸 `pinia`、`pinia-plugin-persistedstate`。若不删自定义 TabBar，`app-tabbar` 引用不存在的 store 会直接编译失败。
- **删多语言 ⟹ 必须先内联 `t()`**（`scripts/inline-cn-locale.mjs`），再删 `locale/`、`composables/useLang.ts`、`composables/index.ts`，去 `main.ts` 的 locale 配置与残留 `useLocale` 导入。保留 Pinia 时 `stores/user.ts` 去 language 偏好与 `setLocale`。
- **删多主题 ⟹** 删 `common/uview-pro.theme.ts`，`main.ts` 去 theme 配置；保留 Pinia 时 `stores/user.ts` 去 `updateTheme`/`useTheme`/`setDarkMode` 相关。`App.root.vue` 的 `u-config-provider` 保留（承载全局 `<u-toast global/>`）。
- **`home.vue`** 中指向已删 demo 页的 `projectCards`/`features` 条目必须同步移除（含现存的坏链接 `/pages/home/createuni-demo`）。
- **`about.vue`** 中指向已删子页的 `menuList` 与 hero-card 跳转必须移除；保留的 `infoList`/`chatList`（外链/群二维码）与 `copyLink`/`preview` 不受影响。
- **删页 ⟹ 同步裁剪 locale 词条**：`zh-CN/en-US` 的 `demo.*`、`about.*Page` 及被删页面专属键（见 missing 检查），避免垃圾词条；但保留页引用的 `common.*`、`home.*`、`about.*` 基础键不得误删。

---

## 4. 安全删除顺序（先内容后工程能力，避免中间态不可编译）

同一轮清理内，按下列顺序执行（仅执行用户勾选删除的模块）：

1. **Demo 演示页 + about 二级页**（模块 1）：先删 `.vue` 与路由，再改 `home.vue`/`about.vue` 的入口引用，最后裁剪 locale 词条。
2. **去多语言**（模块 2）：先跑 `inline-cn-locale.mjs` 内联，再删 locale/composables、改 `main.ts`、清残留导入。
3. **去多主题**（模块 3）：删主题文件、改 `main.ts`、改保留的 `stores/user.ts`。
4. **去自定义 TabBar**（模块 4）：删 tabbar store + app-tabbar、改 `app-page.vue`/`home/about` 去 show-tabbar、**删除 `pages.json` 整个 `tabBar` 配置（含 list）**。`theme.json` 不动。
5. **去 Http 拦截器**（模块 5）：删 `http.interceptor.ts`、改 `main.ts`。
6. **去 Pinia**（模块 6）：删 `stores/`、改 `main.ts`、卸依赖、连带删 pinia-demo 与自定义 TabBar。
7. **去 API 演示层**（模块 7）：删 `api/`。
8. **去冗余依赖与死常量**（模块 8）：卸 `z-paging` 并同步 `tsconfig.json` 去 `z-paging/types`、删 `constant.ts` 死常量。
9. **文档同步**（模块 9）：按已删模块更新 `docs/ARCHITECTURE.md`。
10. **更新组件库**（模块 10）：`update-uview-pro.mjs --no-install` 同步 `constant.ts` 版本；实际依赖升级由用户在正常终端运行 `pnpm add uview-pro@latest`。

> 上表顺序优先保证「先移除页面内容、再收敛工程能力」，任意前缀子集都可在中途编译通过。

---

## 5. 破坏性操作提示

- 凡删除**目录/依赖/文件**的操作，在 skill 执行到该步前需向用户二次确认（展示将删的文件清单）。
- 删除前先运行 `scripts/check-residuals.mjs` 记录基线，删除后复扫对比，确保无遗漏。
