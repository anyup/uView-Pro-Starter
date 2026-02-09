<script setup lang="ts">
import { useLocale, useTheme } from 'uview-pro'
import { computed } from 'vue'

const { darkMode, themes, currentTheme } = useTheme()
const { currentLocale } = useLocale()

const currentThemeName = computed(() => currentTheme.value?.name)
const currentLocaleName = computed(() => currentLocale.value?.name)
</script>

<template>
  <u-config-provider
    :dark-mode="darkMode" :themes="themes" :current-theme="currentThemeName"
    :current-locale="currentLocaleName"
  >
    <KuRootView />
    <u-toast global />
  </u-config-provider>
</template>

<style lang="scss"></style>
