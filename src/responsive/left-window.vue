<script setup lang="ts">
import { useLocale, useTheme } from 'uview-pro'
import { computed, ref } from 'vue'

const { t } = useLocale()
const { getDarkMode } = useTheme()

// 当前激活的菜单项
const activePath = ref('/pages/home/home')

// 深色模式检测
const isDark = computed(() => getDarkMode() === 'dark')

// 导航菜单分组（使用 i18n key）
const menuGroups = computed(() => [
  {
    title: t('sidebar.home'),
    items: [
      { title: t('sidebar.overview'), path: '/pages/home/home', icon: 'home' },
      { title: t('sidebar.uviewIntro'), path: '/pages/home/uview-intro', icon: 'star' },
      { title: t('sidebar.httpDemo'), path: '/pages/home/http-demo', icon: 'ie' },
      { title: t('sidebar.piniaDemo'), path: '/pages/home/pinia-demo', icon: 'file-text' },
      { title: t('sidebar.componentsDemo'), path: '/pages/home/components-demo', icon: 'grid' },
      { title: t('sidebar.createDemo'), path: '/pages/home/create-demo', icon: 'integral' },
    ],
  },
  {
    title: t('sidebar.about'),
    items: [
      { title: t('sidebar.aboutApp'), path: '/pages/about/about', icon: 'info-circle' },
      { title: t('sidebar.aboutMe'), path: '/pages/about/about-me', icon: 'account' },
      { title: t('sidebar.license'), path: '/pages/about/license', icon: 'file-text' },
      { title: t('sidebar.contributors'), path: '/pages/about/contributors', icon: 'man-add' },
      { title: t('sidebar.faq'), path: '/pages/about/faq', icon: 'warning' },
      { title: t('sidebar.guide'), path: '/pages/about/guide', icon: 'bookmark' },
      { title: t('sidebar.settings'), path: '/pages/about/settings', icon: 'setting' },
    ],
  },
])

function navigateTo(path: string) {
  activePath.value = path
  uni.navigateTo({ url: path })
}
</script>

<template>
  <view class="left-window" :class="{ 'left-window--dark': isDark }">
    <!-- 应用标题 -->
    <view class="sidebar-header">
      <image class="sidebar-logo" src="/static/logo.png" mode="aspectFit" />
      <text class="sidebar-title">uView Pro Starter</text>
    </view>

    <!-- 导航菜单 -->
    <scroll-view scroll-y class="sidebar-nav">
      <view v-for="(group, gIdx) in menuGroups" :key="gIdx" class="nav-group">
        <text class="nav-group__title">{{ group.title }}</text>
        <view
          v-for="(item, iIdx) in group.items"
          :key="iIdx"
          class="nav-item"
          :class="{ 'nav-item--active': activePath === item.path }"
          @click="navigateTo(item.path)"
        >
          <u-icon :name="item.icon" size="36" :color="activePath === item.path ? 'var(--u-type-primary)' : 'var(--u-tips-color)'" />
          <text class="nav-item__text">{{ item.title }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.left-window {
  height: 100vh;
  width: 280px;
  min-width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: $u-bg-color;
  border-right: 1px solid $u-border-color;
  overflow: hidden;
}

.sidebar-header {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid $u-border-color;
  background: $u-bg-white;
}

.sidebar-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  color: $u-main-color;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 0;
}

.nav-group {
  margin-bottom: 8px;

  &__title {
    display: block;
    padding: 8px 20px 4px;
    font-size: 11px;
    font-weight: 600;
    color: $u-tips-color;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  margin: 2px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.08);
  }

  &--active {
    background: rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.12);

    .nav-item__text {
      color: var(--u-type-primary);
      font-weight: 600;
    }
  }

  &__text {
    font-size: 14px;
    color: $u-content-color;
    transition: color 0.2s ease;
  }
}
</style>
