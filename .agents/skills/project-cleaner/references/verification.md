# 验证清单（references/verification.md）

> 清理完成后必须按序执行，确认「无残留 + 可编译 + 可运行」。

---

## 1. 残留扫描（快）

```bash
node <skill>/scripts/check-residuals.mjs --dir .     # 目标项目根（默认 CWD）
```

**期望**：退出码 0，无任何「红线」命中文案。
如命中，按提示补删/改文件后**重复执行直到为 0**。

> **已知基线例外（真实 Starter）**：清理前基线常命中 1 条既有坏键——`src/pages/home/uview-intro.vue:96` 的 `t('guidePage.steps.install')` 缺 `about.` 前缀（实际键为 `about.guidePage.steps.install`），运行时会取到 undefined。这是项目原生的 bug，非 skill 引入。默认这些 uview-intro demo 页会被删除，删后复扫自然为 0；若用户保留该 demo 页，此项应记为「既定预期」或在清理时顺手补 `about.` 前缀。

---

## 2. 类型检查

```bash
cd <目标项目根>
pnpm run type-check
```

**期望**：无类型错误。
> 典型报错来源：删多语言后残留 `t(`；删 stores 后其它文件引用 `useXxxStore`；删主题后 `stores/user.ts` 仍 import `useTheme/media`。按错误定位回 `references/architecture.md` 的不变量补齐。

---

## 3. 构建验证（H5 主目标）

```bash
pnpm run build:h5
```

**期望**：构建成功，无缺失模块/路由报错。

---

## 4. 运行时抽查（可选）

```bash
pnpm dev:h5
```

浏览器打开 dev 地址，抽查：
- 首页（`pages/home/home`）—— 静态区（hero/快速开始）正常，删后的入口数组不再指向不存在页面；
- 关于页（`pages/about/about`）—— 保留的信息/交流区正常，`menuList` 网格已按需移除。

> 若用户勾选了「去自定义 TabBar」，确认 `pages.json` 已无 `tabBar` 配置、页面底部无 Tab 栏；若「去多语言」，确认页面文案为中文且无 `[missing]` 占位。

---

## 5. 二次确认：破坏性项回执

执行前已向用户回执的删除项（目录/依赖/文件），在验证通过后一并在最终汇报中列出「已删除/已修改」清单，供用户对账。

---

## 6. 演练脚本（开发本 skill 时用，非正式运行）

在临时副本（非线上仓库）演练清理时：
```bash
node ../.trae/skills/project-cleaner/scripts/check-residuals.mjs --dir .   # 基线应 0
node ../.trae/skills/project-cleaner/scripts/inline-cn-locale.mjs --dir . --dry-run
```
干净演练需真实删除时：`--dry-run` 去掉。演练结论回填到 references，再供正式清理由用户发起。
