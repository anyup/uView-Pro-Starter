<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {
  // eslint-disable-next-line no-console
  console.log('App.root.vue onLoad')
})
</script>

<template>
  <u-config-provider>
    <slot />
    <u-toast global />
  </u-config-provider>
</template>

<style lang="scss"></style>
