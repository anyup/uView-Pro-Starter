import * as Pinia from 'pinia'
import uViewPro from 'uview-pro'
import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(uViewPro)
  return {
    app,
    Pinia,
  }
}
