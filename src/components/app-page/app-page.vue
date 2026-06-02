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
  // 渐变色
  backgroundImage: 'linear-gradient(90deg, var(--u-type-primary-dark), var(--u-type-primary-disabled))',
})

// 多窗口模式检测：窗口宽度 >= 768px 时隐藏自定义 tabbar
const isMultiWindow = ref(false)

function checkWindowWidth() {
  // #ifdef H5
  isMultiWindow.value = window.innerWidth >= 768
  // #endif
}

onMounted(() => {
  checkWindowWidth()
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
  <view class="app-page" :class="{ 'has-tabbar': showTabbar && !isMultiWindow }" :style="$u.toStyle(customStyle)">
    <!-- #ifndef MP-ALIPAY -->
    <u-navbar
      v-if="!hideNav" :is-back="showNavBack && !showTabbar" :title="navTitle" :background="background" :is-fixed="true"
      :immersive="false" back-icon-name="arrow-leftward" title-width="350" title-color="#ffffff"
      back-icon-color="#ffffff"
    />
    <!-- #endif -->
    <u-transition name="slide-left" :appear="true">
      <slot />
    </u-transition>
    <app-tabbar v-if="showTabbar && !isMultiWindow" />
  </view>
</template>

<style lang="scss" scoped>
.app-page {
    width: 100%;
    min-height: 100vh;
    // padding-bottom: 30rpx;
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

}
</style>
