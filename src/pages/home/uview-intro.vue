<script setup lang="ts">
import { computed } from 'vue'

// 功能特性数据
const features = computed(() => [
  {
    icon: 'star',
    title: '组件丰富',
    desc: '提供80+高质量组件，覆盖移动端开发需求',
  },
  {
    icon: 'heart',
    title: '设计精良',
    desc: 'API 设计现代，文档详尽，开发体验良好',
  },
  {
    icon: 'setting',
    title: '高度可配',
    desc: '支持自定义主题、样式配置、暗黑模式、多语言',
  },
  {
    icon: 'android-fill',
    title: '多端适配',
    desc: '完美支持H5、小程序、App、鸿蒙等多端',
  },
])

// 核心优势
const advantages = computed(() => [
  {
    title: 'TypeScript支持',
    desc: '完整的TypeScript类型定义，提供更好的开发体验',
  },
  {
    title: 'Vue3 Composition API',
    desc: '基于Vue3 Composition API，性能更优，代码更简洁',
  },
  {
    title: '按需引入',
    desc: '支持组件按需引入，减少包体积，提升应用性能',
  },
  {
    title: '易于定制',
    desc: '提供丰富的配置项和样式定制能力',
  },
])
</script>

<template>
  <app-page nav-title="uView Pro 介绍" show-nav-back>
    <view class="app-container">
      <!-- 头部介绍 -->
      <view class="hero-section">
        <u-image src="/static/logo.png" width="120rpx" height="120rpx" mode="aspectFit" />
        <view class="hero-content">
          <u-text text="uView Pro" size="48rpx" bold color="primary" />
          <u-text text="基于uni-app的企业级UI组件库" size="28rpx" />
          <u-text text="v1.0.0" size="24rpx" />
        </view>
      </view>

      <!-- 功能特性 -->
      <view class="section">
        <u-text text="功能特性" size="32rpx" bold />
        <u-gap />
        <view class="features-grid">
          <view v-for="(feature, index) in features" :key="index" class="feature-card">
            <u-icon :name="feature.icon" size="48rpx" color="primary" />
            <u-text :text="feature.title" size="28rpx" />
            <u-text :text="feature.desc" size="24rpx" />
          </view>
        </view>
      </view>

      <!-- 核心优势 -->
      <view class="section">
        <u-text text="核心优势" size="32rpx" bold />
        <view class="advantages-list">
          <view v-for="(advantage, index) in advantages" :key="index" class="advantage-item">
            <u-icon name="checkmark-circle" size="32rpx" color="success" />
            <view class="advantage-content">
              <u-text :text="advantage.title" size="28rpx" bold />
              <u-text :text="advantage.desc" size="24rpx" />
            </view>
          </view>
        </view>
      </view>

      <!-- 快速开始 -->
      <view class="section">
        <u-text text="快速开始" size="32rpx" bold />
        <u-gap />
        <u-card title="安装使用" border-radius="0" margin="0">
          <view class="code-block">
            <u-text text="npm install uview-pro" size="26rpx" color="primary" custom-class="code-text" />
          </view>
          <u-text text="或者使用 pnpm:" size="24rpx" />
          <view class="code-block">
            <u-text text="pnpm add uview-pro" size="26rpx" color="primary" custom-class="code-text" />
          </view>
        </u-card>
      </view>
    </view>
  </app-page>
</template>

<style lang="scss" scoped>
.app-container {
  padding: 32rpx;
  min-height: 100vh;
}

.hero-section {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 64rpx 0;
  background: linear-gradient(135deg, rgba(var(--u-type-primary-rgb), 0.1) 0%, rgba(var(--u-type-success-rgb), 0.1) 100%);
  border-radius: 24rpx;
  margin-bottom: 48rpx;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.section {
  margin-bottom: 48rpx;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  background: $u-bg-white;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

.advantages-list {
  display: flex;
  flex-direction: column;
}

.advantage-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 30rpx 12rpx;
  border-radius: 12rpx;
  background-color: var(--u-bg-color);
  box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.06);
  margin: 20rpx 0;
}

.advantage-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}
</style>
