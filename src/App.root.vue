<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { useLocale, useTheme } from 'uview-pro'
import { onMounted } from 'vue'

const { darkMode, currentTheme } = useTheme()
const { currentLocale, locales } = useLocale()

onLoad(() => {
  console.log('App.root.vue onLoad')
  console.log('darkMode->', darkMode.value)
  console.log('theme->', currentTheme.value?.name)
  console.log('locale->', currentLocale.value?.name)
  console.log('locales->', locales.value)
})

onMounted(() => {
  console.log('App.root.vue onMounted')
})
</script>

<template>
  <u-config-provider>
    <slot />
    <u-toast global />
  </u-config-provider>
</template>

<style lang="scss"></style>
