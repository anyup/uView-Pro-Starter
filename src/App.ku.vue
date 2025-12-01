<script setup lang="ts">
import { useTheme } from 'uview-pro'
import { computed } from 'vue'

const { darkMode, themes, currentTheme } = useTheme()

const themeName = computed(() => currentTheme.value?.name)
function handleClickGithub() {
  if (window?.open) {
    window.open('https://github.com/anyup/uview-pro', '_blank')
  }
  else {
    uni.showToast({
      icon: 'none',
      title: '请使用浏览器打开',
    })
  }
}
</script>

<template>
  <div>
    <u-config-provider :dark-mode="darkMode" :current-theme="themeName" :themes="themes">
      <KuRootView />
    </u-config-provider>
    <div class="root-bar">
      Template By
      <span class="color-blue" @click="handleClickGithub"> · uView Pro</span>
    </div>
  </div>
</template>

<style>
.root-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
}

.color-blue {
  color: #409eff;
  cursor: pointer;
}
</style>
