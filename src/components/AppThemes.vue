<script setup lang="ts">
import { useLocale, useTheme } from 'uview-pro'

import { ref } from 'vue'

const { getAvailableThemes, setTheme, setDarkMode, currentTheme, darkMode } = useTheme()
const { locales, setLocale, currentLocale } = useLocale()
const show = ref(false)
const showType = ref<'theme' | 'darkMode' | 'locale'>('theme')
const list = ref<any[]>([])

function showThemeSelector() {
  list.value = getAvailableThemes().map((theme: any) => ({
    value: theme.name,
    label: theme.label,
  }))
  showType.value = 'theme'
  show.value = true
}

function showDarkModeSelector() {
  list.value = [
    {
      value: 'auto',
      label: '跟随系统',
    },
    {
      value: 'light',
      label: '浅色模式',
    },
    {
      value: 'dark',
      label: '深色模式',
    },
  ]
  showType.value = 'darkMode'
  show.value = true
}

function showLocaleSelector() {
  list.value = locales.value.map((locale: any) => ({
    value: locale.name,
    label: locale.name === 'zh-CN' ? '中文' : 'English',
  }))
  showType.value = 'locale'
  show.value = true
}
function confirm(e: any[]) {
  const value = e[0].value
  if (showType.value === 'theme') {
    setTheme(value)
  }
  else if (showType.value === 'darkMode') {
    setDarkMode(value)
  }
  else if (showType.value === 'locale') {
    setLocale(value)
    setTimeout(() => {
      uni.reLaunch({
        url: '/',
      })
    }, 100)
  }
  show.value = false
}
</script>

<template>
  <view>
    <u-gap />
    <u-select v-model="show" mode="single-column" :list="list" @confirm="confirm" />
    <u-cell-group title="设置">
      <u-cell-item title="主题" :value="currentTheme?.label" @click="showThemeSelector" />
      <u-cell-item title="暗黑模式" :value="darkMode" @click="showDarkModeSelector" />
      <u-cell-item title="多语言" :value="currentLocale?.name === 'zh-CN' ? '中文' : 'English'" @click="showLocaleSelector" />
    </u-cell-group>
  </view>
</template>
