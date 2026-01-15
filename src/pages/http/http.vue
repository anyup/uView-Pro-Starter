<script setup lang="ts">
import TestHttp from '@/components/TestHttp.vue'

definePage({
  layout: 'default',
  style: {
    navigationBarTitleText: 'Test http',
  },
})
</script>

<template>
  <view px-5 py-5 text-center>
    <TestHttp />
  </view>
</template>
