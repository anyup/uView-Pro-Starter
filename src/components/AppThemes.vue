<script setup lang="ts">
import { useTheme } from 'uview-pro'
import { ref } from 'vue'

const { getAvailableThemes, setTheme, setDarkMode } = useTheme()
const show = ref(false)
const showType = ref<'theme' | 'darkMode'>('theme')
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
function confirm(e: any[]) {
  const value = e[0].value
  if (showType.value === 'theme') {
    setTheme(value)
  }
  else if (showType.value === 'darkMode') {
    setDarkMode(value)
  }
  show.value = false
}
</script>

<template>
  <view>
    <u-gap />
    <u-select v-model="show" mode="single-column" :list="list" @confirm="confirm" />
    <u-button type="primary" @click="showThemeSelector">
      选择主题
    </u-button>
    <u-gap />
    <u-button type="primary" @click="showDarkModeSelector">
      暗黑模式
    </u-button>
  </view>
</template>
