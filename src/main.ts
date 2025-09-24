import * as Pinia from 'pinia'
import uViewPro, { httpPlugin } from 'uview-pro'
import { createSSRApp } from 'vue'

import { httpInterceptor, httpRequestConfig } from '@/api/http.interceptor'
import theme from '@/common/uview-pro.theme'
import App from './App.vue'

import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  // 引入uView Pro
  app.use(uViewPro, { theme })
  // 引入http插件
  app.use(httpPlugin, {
    interceptor: httpInterceptor,
    requestConfig: httpRequestConfig,
  })
  return {
    app,
    Pinia,
  }
}
