<script setup lang="ts">
import { $u } from 'uview-pro'
</script>

<template>
  <view>
    <u-cell-group title="页面">
      <u-cell-item title="http页面" @click="$u.route('pages/http/http')" />
      <u-cell-item title="登录页面" @click="$u.route('pages/login/login')" />
    </u-cell-group>
  </view>
</template>
