<script setup>
import { ref } from 'vue'

const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const title = ref('uView Pro')
try {
  // #ifdef H5
  title.value = currentPage.$page.meta.navigationBar.titleText
  // #endif
  // #ifdef APP-PLUS
  const webView = currentPage.$getAppWebview()
  title.value = webView.getStyle().name
  // #endif
}
catch (e) {
  console.error(e)
}
</script>

<template>
  <view>
    <u-navbar :title="title" />
    <slot />
  </view>
</template>
