# locale 词条映射与内联要点（references/locale-inline.md）

> 供两类场景使用：
> 1. **删页删词条** —— 删除页面时同步裁剪 `src/locale/lang/{zh-CN,en-US}.json` 中的对应键；
> 2. **去多语言内联** —— `scripts/inline-cn-locale.mjs` 以 `zh-CN.json` 为词源，把 `t('key')` 改写为硬编码中文。

---

## 1. 页面 → 词条映射

| 页面 / 文件 | 使用的 zh-CN 词条命名空间 |
|---|---|
| `pages/home/home.vue` | `common.*`、`home.*` |
| `pages/home/uview-intro.vue` | `demo.uviewIntro.*`、`about.guidePage.steps.install`（记忆键 `common.*`、`about.*` 亦可能）、`theme.*` |
| `pages/home/http-demo.vue` | `demo.http.*`、`common.*` |
| `pages/home/pinia-demo.vue` | `demo.pinia.*`、`common.*` |
| `pages/home/components-demo.vue` | `demo.components.*`、`demo.pinia.*`（复用部分键） |
| `pages/home/create-demo.vue` | `demo.create.*`、`common.*` |
| `pages/about/about.vue` | `about.*`（title/wechatId/tagline/featureEntry/communication/otherInfo）、`common.copySuccess` |
| `pages/about/about-me.vue` | `about.aboutMePage.*` |
| `pages/about/contributors.vue` | `about.contributorsPage.*` |
| `pages/about/faq.vue` | `about.faqPage.*` |
| `pages/about/guide.vue` | `about.guidePage.*` |
| `pages/about/license.vue` | `about.licensePage.*` |
| `pages/about/settings.vue` | `about.settingsPage.*`、`theme.*` |

> 顶层 `theme.*`（`theme.uviewpro/purple/green/orange/dark`）只被 `settings.vue` 的主题选择器与 `pinia-demo` 用到；删二级页时若无其它引用可一并删。
>
> 注意 `components-demo.vue` 复用了 `demo.pinia.*` 的若干键（如 `notificationEnabled/Disabled`、`enterUsername`、`loginStatusText`、`currentCount`）与 `guidePage.steps.install` 等，删桶时**先搜 `t('…')` 实引用再删键**，防止误删被保留页引用的键。

---

## 2. `t()` 内联处理要点（inline-cn-locale.mjs 实现依据）

- 词源：`src/locale/lang/zh-CN.json`，做展平的 `path → 中文` 查表。
- 按 `<template>` / `<script>` 分段处理：
  - `{{ t('a.b') }}` → `{{ 中文 }}`（模板文本/插值）；
  - `:title="t('a.b')"` 或 `<u-x :prop="t('a.b')">` → `:title="'中文'"`（属性绑定）；
  - `<script>` 内 `t('a.b')` → `'中文'`。
- **插值参数** `t('a.b', { name })` 或 `t('a.b', { name })`：
  - 在 `template` 中把 `{name}` 替换为 `{{name}}`；
  - 在 `script` 中把 `{name}` 替换为 `${name}`（需保证所在处是模板字符串上下文，脚本内尽量用 `'前缀${name}后缀'`）。
- **动态键** `t(\`theme.${k}\`)`：按 `k` 运行时值去 `theme.*` 表替换为对应中文；若无法静态确定，保留为 `theme[k]`/`zhCN.theme[k]` 直取，或提示人工确认。
- 内联**后**清理：
  - 移除不再使用的 `import { useLocale } from 'uview-pro'`；
  - 移除 `const { t } = useLocale()` 解构（当所在文件已无任何残余 `t(` 调用）；
  - 移除 `$u` 相关仅服务于 demo 提示的引用需按残留检查复核（`$u` 仍可能被 `$u.http`/`$u.color`/`$u.toast` 使用，勿误删）。
- 提供 `--dry-run` 打印将改动，落地可选白名单 `--only <glob>`（如只处理保留页）。

---

## 3. 删页删词条清单（模块 1 联动）

删除下列页面时，同时删除 `zh-CN.json` 与 `en-US.json` 中对应命名空间：

| 被删页面 | 删除的词条命名空间 |
|---|---|
| home 下 5 个 demo | `demo.components.*`、`demo.create.*`、`demo.http.*`、`demo.pinia.*`、`demo.uviewIntro.*` |
| about-me | `about.aboutMePage.*` |
| contributors | `about.contributorsPage.*` |
| faq | `about.faqPage.*` |
| guide | `about.guidePage.*` |
| license | `about.licensePage.*` |
| settings | `about.settingsPage.*`；`theme.*`（确认无其它引用后） |

> 保留的 `home.vue`/`about.vue` 仍引用 `home.*`、`about.*` 基础键与 `common.*`，**不得**随删页裁剪。

---

## 4. 内联后仍残留的排查

内联完成后运行 `scripts/check-residuals.mjs`，其会：
- 复扫 `t(` 与 `useLocale` 是否仍有残留；
- 若还保留 `locale/`，校验 `t('KEY')` 键是否存在（缺键会红字提示）。
