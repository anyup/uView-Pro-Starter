<script lang="ts">
</script>

<script setup lang="ts">
import { $u } from 'uview-pro'
import { ref } from 'vue'
import { useTabbarStore } from '@/stores'

defineOptions({
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared',
  },
})

const { tabbarList } = useTabbarStore()

const current = ref<number>(0)
</script>

<template>
  <u-tabbar v-model="current" :list="tabbarList" :active-color="$u.color.primary" />
</template>

<style lang="scss" scoped>
</style>
