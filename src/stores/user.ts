import type { DarkMode } from 'uview-pro/types/global'
import { defineStore } from 'pinia'
import { useLocale, useTheme } from 'uview-pro'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userName = ref('')
  const isLoggedIn = ref(false)
  const preferences = ref({
    theme: 'light',
    language: 'zh-CN',
    notifications: true,
  })

  const { setDarkMode } = useTheme()
  const { setLocale } = useLocale()

  function login(name: string) {
    if (!name || !name.trim()) {
      throw new Error('用户名不能为空')
    }
    userName.value = name
    isLoggedIn.value = true
  }

  function logout() {
    isLoggedIn.value = false
    userName.value = ''
  }

  function updateTheme(theme: DarkMode) {
    preferences.value.theme = theme
    try {
      setDarkMode(theme)
    }
    catch {
      // ignore if hook not available in runtime
    }
  }

  function setLanguage(locale: string) {
    preferences.value.language = locale
    try {
      setLocale(locale)
    }
    catch {
      // ignore
    }
  }

  function toggleNotifications() {
    preferences.value.notifications = !preferences.value.notifications
  }

  function clearData() {
    uni.clearStorage()
    userName.value = ''
    isLoggedIn.value = false
    preferences.value = {
      theme: 'light',
      language: 'zh-CN',
      notifications: true,
    }
  }

  return {
    userName,
    isLoggedIn,
    preferences,
    login,
    logout,
    updateTheme,
    setLanguage,
    toggleNotifications,
    clearData,
  }
}, { persist: true })
