import { fileURLToPath, URL } from 'node:url'

import Uni from '@uni-helper/plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { uViewProResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniMiddleware from '@uni-helper/vite-plugin-uni-middleware'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier'
import UniRoot from '@uni-ku/root'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // https://uni-helper.js.org/vite-plugin-uni-components
    Components({
      dts: true,
      resolvers: [uViewProResolver()],
    }),
    // https://uni-helper.js.org/vite-plugin-uni-pages
    UniPages(),
    // https://uni-helper.js.org/vite-plugin-uni-layouts
    UniLayouts(),
    // https://uni-helper.js.org/vite-plugin-uni-manifest
    UniManifest(),
    // https://uni-helper.js.org/vite-plugin-uni-platform
    UniPlatform(),
    // https://uni-helper.js.org/vite-plugin-uni-platform-modifier
    UniPlatformModifier(),
    // https://uni-helper.js.org/vite-plugin-uni-middleware
    UniMiddleware(),
    // https://github.com/uni-ku/root
    UniRoot(),
    // https://uni-helper.js.org/plugin-uni
    Uni(),
    UnoCSS(),
  ],
  build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  optimizeDeps: {
    exclude: [
      'vue-demi',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/uview-pro.theme.scss";',
      },
    },
  },
})
