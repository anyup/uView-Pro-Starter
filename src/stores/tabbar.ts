import type { TabbarItem } from 'uview-pro/types/global'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabbarStore = defineStore('tabbar', () => {
  const activeIndex = ref(0)
  const tabbarList = ref<TabbarItem[]>([
    {
      text: '首页',
      iconPath: 'home',
      selectedIconPath: 'home-fill',
      pagePath: '/pages/home/home',
      isDot: true,
    },
    {
      text: '关于',
      iconPath: 'account',
      selectedIconPath: 'account-fill',
      pagePath: '/pages/about/about',
      count: 3,
    },
  ])

  const setActiveIndex = (index: number) => {
    activeIndex.value = index
  }

  const updateBadge = (index: number, count: number) => {
    tabbarList.value[index].count = count
  }

  const updateIsDot = (index: number, isDot: boolean) => {
    tabbarList.value[index].isDot = isDot
  }

  return {
    activeIndex,
    tabbarList,
    setActiveIndex,
    updateBadge,
    updateIsDot,
  }
}, {
  persist: true,
})
