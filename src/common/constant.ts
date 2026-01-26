export const APP_INFO: {
  name: string
  version: string
  buildTime: string
  platform: string
} = {
  name: 'uViewPro(跨平台UI组件库)',
  version: '1.0.9',
  buildTime: '2025-12-23',
  platform: getPlatform(),
}

export const UVIEW_PRO_INFO = {
  name: 'uview-pro',
  version: '0.4.7',
  buildTime: '2025-12-19',
}

function getPlatform() {
  let platform = uni.getSystemInfoSync().platform
  if (platform) {
    return platform
  }
  // #ifdef H5
  platform = 'H5'
  // #endif
  // #ifdef MP-WEIXIN
  platform = '微信小程序'
  // #endif
  // #ifdef MP-ALIPAY
  platform = '支付宝小程序'
  // #endif
  // #ifdef APP-PLUS
  platform = 'App'
  // #endif
  // #ifdef APP-HARMONY
  platform = 'HarmonyOS'
  // #endif
  platform = '未知平台'
  return platform
}

export const ONBOARDING_STORAGE_BASE_KEY = `guide-onboarded-${APP_INFO.version}`

export const GUIDE_TABS_KEY = `guide-page-tabs-${APP_INFO.version}`

export const GUIDE_FAB_KEY = `guide-page-fab-${APP_INFO.version}`

export const GUIDE_TABBAR_KEY = `guide-page-tabbar-${APP_INFO.version}`

export const GUIDE_THEME_SWITCHER_KEY = `guide-theme-switcher-${APP_INFO.version}`

export const GUIDE_EXPERIENCE_KEY = `guide-experience-entry-${APP_INFO.version}`
