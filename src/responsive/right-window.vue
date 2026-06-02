<script setup lang="ts">
</script>

<template>
  <view class="right-window">
    <view class="placeholder">
      <u-icon name="info-circle" size="64" color="#c0c4cc" />
      <text class="placeholder__title">uView Pro Starter</text>
      <text class="placeholder__desc">从左侧菜单选择一个功能开始体验</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.right-window {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: #303133;
    margin-top: 8px;
  }

  &__desc {
    font-size: 14px;
    color: #909399;
  }
}
</style>
