<script setup lang="ts">
import { $u } from 'uview-pro'
</script>

<template>
  <view>
    <view class="mt-5">
      <u-button type="success" @click="$u.route('pages/http/http')">
        Test http
      </u-button>
    </view>

    <view class="mt-5">
      <u-button type="warning" @click="$u.route('pages/login/login')">
        To login
      </u-button>
    </view>
  </view>
</template>
