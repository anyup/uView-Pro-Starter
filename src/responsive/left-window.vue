<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的菜单项
const activePath = ref('/pages/home/home')

// 导航菜单分组
const menuGroups = [
  {
    title: '首页',
    items: [
      { title: '项目概览', path: '/pages/home/home', icon: 'home' },
      { title: 'uView Pro 介绍', path: '/pages/home/uview-intro', icon: 'star' },
      { title: '网络请求', path: '/pages/home/http-demo', icon: 'ie' },
      { title: 'Pinia 持久化', path: '/pages/home/pinia-demo', icon: 'file-text' },
      { title: '组件演示', path: '/pages/home/components-demo', icon: 'grid' },
      { title: '脚手架创建', path: '/pages/home/create-demo', icon: 'integral' },
    ],
  },
  {
    title: '关于',
    items: [
      { title: '关于应用', path: '/pages/about/about', icon: 'info-circle' },
      { title: '关于我', path: '/pages/about/about-me', icon: 'account' },
      { title: '开源协议', path: '/pages/about/license', icon: 'file-text' },
      { title: '贡献者', path: '/pages/about/contributors', icon: 'man-add' },
      { title: '常见问题', path: '/pages/about/faq', icon: 'warning' },
      { title: '使用指南', path: '/pages/about/guide', icon: 'bookmark' },
      { title: '设置', path: '/pages/about/settings', icon: 'setting' },
    ],
  },
]

function navigateTo(path: string) {
  activePath.value = path
  uni.navigateTo({ url: path })
}
</script>

<template>
  <view class="left-window">
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
          <u-icon :name="item.icon" size="36" :color="activePath === item.path ? '#2979ff' : '#909399'" />
          <text class="nav-item__text">{{ item.title }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.left-window {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  border-right: 1px solid #e4e7ed;
}

.sidebar-header {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e4e7ed;
  background: #ffffff;
}

.sidebar-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
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
    color: #909399;
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
    background: rgba(41, 121, 255, 0.08);
  }

  &--active {
    background: rgba(41, 121, 255, 0.12);

    .nav-item__text {
      color: #2979ff;
      font-weight: 600;
    }
  }

  &__text {
    font-size: 14px;
    color: #606266;
    transition: color 0.2s ease;
  }
}
</style>
