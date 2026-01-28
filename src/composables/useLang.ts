import { useLocale } from 'uview-pro'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLang() {
  const { locale } = useI18n()
  const { setLocale, currentLocale, locales } = useLocale()

  // 派生当前语言（基于 uView Pro 的 currentLocale），确保模板自动响应更新
  const currentLang = computed(() => {
    return currentLocale.value?.name || currentLocale.value || ''
  })
  // 当前语言标签
  const currentLangLabel = computed(() => {
    return getLangLabel(currentLang.value)
  })

  // 可用语言列表
  const availableLangs = computed(() => {
    return locales.value.map(locale => ({
      name: locale.name,
      label: getLangLabel(locale.name),
    }))
  })
  // 辅助函数：根据不同的语言代码格式，返回i18n使用的语言代码
  function getI18nLocale(value: string) {
    switch (value) {
      case 'zh-CN':
      case 'zh-Hans':
        return 'zh-Hans'
      case 'en-US':
      case 'en':
        return 'en'
      default:
        return 'zh-Hans'
    }
  }

  // 辅助函数：根据不同的语言代码格式，返回uView Pro使用的语言代码
  function getUProLocale(value: string) {
    switch (value) {
      case 'zh-Hans':
      case 'zh-CN':
        return 'zh-CN'
      case 'en':
      case 'en-US':
        return 'en-US'
      default:
        return 'zh-CN'
    }
  }

  // 根据语言代码返回对应的语言文字标签
  function getLangLabel(localeName: string) {
    const normalized = getUProLocale(localeName)
    if (normalized === 'zh-CN')
      return '简体中文'
    if (normalized === 'en-US')
      return 'English'
    return normalized
  }

  // 切换语言
  function switchLang(lang: string) {
    const i18nLocale = getI18nLocale(lang)
    const uProLocale = getUProLocale(lang)
    // 切换uniapp语言
    uni.setLocale(i18nLocale)
    // 切换vue-i18n语言
    locale.value = i18nLocale
    // 切换uView Pro语言
    setLocale(uProLocale)
  }

  return {
    currentLang,
    currentLangLabel,
    availableLangs,
    getLangLabel,
    switchLang,
  }
}
