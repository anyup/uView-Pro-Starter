import * as Pinia from 'pinia'
import uViewPro from 'uview-pro'
import { createSSRApp } from 'vue'
import themes from '@/common/uview-pro.theme'
import i18n from '@/locale'
import store from '@/stores'
import App from './App.vue'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  app.use(uViewPro, {
    theme: {
      themes,
      defaultTheme: 'green',
      defaultDarkMode: 'light',
    },
    locale: 'zh-CN',
  })
  app.use(store)
  return {
    app,
    Pinia,
  }
}
