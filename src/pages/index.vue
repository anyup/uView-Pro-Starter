<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppLinks from '@/components/AppLinks.vue'
import AppLogos from '@/components/AppLogos.vue'
import AppThemes from '@/components/AppThemes.vue'
import InputEntry from '@/components/InputEntry.vue'

definePage({
  layout: 'default',
  style: {
    navigationBarTitleText: 'Home',
  },
})
</script>

<template>
  <view px-5 py-5 text-center>
    <AppLogos />
    <InputEntry />
    <AppFooter />
    <AppLinks />
    <AppThemes />
  </view>
</template>
