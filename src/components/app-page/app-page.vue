<script setup lang="ts">
import type { PropType } from 'vue'
import { $u } from 'uview-pro'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const props = defineProps({
  navTitle: {
    type: String,
    default: 'uView Pro',
  },
  showNavBack: {
    type: Boolean,
    default: true,
  },
  hideNav: {
    type: Boolean,
    default: false,
  },
  showTabbar: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: '',
  },
  customClass: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: '',
  },
})

const background = reactive({
  backgroundColor: 'var(--u-type-primary)',
  backgroundImage: 'linear-gradient(90deg, var(--u-type-primary-dark), var(--u-type-primary-disabled))',
})

// 多窗口模式检测：setup 阶段同步检测，避免初始渲染闪烁
const isMultiWindow = ref(false)

function checkWindowWidth() {
  // #ifdef H5
  isMultiWindow.value = window.innerWidth >= 768
  // #endif
}

// setup 阶段立即检测一次，确保首次渲染就是正确状态
checkWindowWidth()

onMounted(() => {
  // #ifdef H5
  window.addEventListener('resize', checkWindowWidth)
  // #endif
})

onUnmounted(() => {
  // #ifdef H5
  window.removeEventListener('resize', checkWindowWidth)
  // #endif
})
</script>

<template>
  <view class="app-page" :class="{ 'has-tabbar': showTabbar && !isMultiWindow, 'is-multi-window': isMultiWindow }" :style="$u.toStyle(customStyle)">
    <!-- #ifndef MP-ALIPAY -->
    <!-- 多窗口模式下隐藏 navbar，避免页面切换时闪烁 -->
    <u-navbar
      v-if="!hideNav && !isMultiWindow" :is-back="showNavBack && !showTabbar" :title="navTitle" :background="background" :is-fixed="true"
      :immersive="false" back-icon-name="arrow-leftward" title-width="350" title-color="#ffffff"
      back-icon-color="#ffffff"
    />
    <!-- 多窗口模式下显示简洁标题栏 -->
    <view v-if="isMultiWindow && !hideNav" class="multi-window-header">
      <text class="multi-window-header__title">{{ navTitle }}</text>
    </view>
    <!-- #endif -->
    <!-- 多窗口模式下：内容区域独立滚动 -->
    <scroll-view v-if="isMultiWindow" scroll-y class="multi-window-content">
      <slot />
    </scroll-view>
    <!-- 手机端：原有过渡动画 -->
    <u-transition v-else name="slide-left" :appear="true">
      <slot />
    </u-transition>
    <app-tabbar v-if="showTabbar && !isMultiWindow" />
  </view>
</template>

<style lang="scss" scoped>
.app-page {
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    background-color: $u-bg-white;
    -webkit-font-smoothing: antialiased;
    color: $u-main-color;
    transition: background 0.3s ease;

    &.has-tabbar {
        background-image: linear-gradient(135deg,
                rgba(var(--u-type-primary-rgb, 41, 121, 255), 0.04) 0%,
                rgba(var(--u-type-success-rgb, 25, 190, 107), 0.04) 40%,
                rgba(var(--u-type-warning-rgb, 255, 153, 0), 0.04) 100%);
    }

    // 多窗口模式：固定高度 flex 布局，标题栏不动，内容区滚动
    &.is-multi-window {
        height: 100vh;
        min-height: unset;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
}

.multi-window-header {
    flex-shrink: 0;
    padding: 16px 24px;
    background: $u-bg-white;
    border-bottom: 1px solid $u-border-color;

    &__title {
        font-size: 18px;
        font-weight: 700;
        color: $u-main-color;
    }
}

.multi-window-content {
    flex: 1;
    overflow-y: auto;
}
</style>
