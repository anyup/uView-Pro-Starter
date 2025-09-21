<script setup lang="ts">
import { $u } from 'uview-pro'
import AppFooter from '@/components/AppFooter.vue'
import AppLogos from '@/components/AppLogos.vue'
import InputEntry from '@/components/InputEntry.vue'
</script>

<template>
  <view px-10 py-20 text-center>
    <AppLogos />
    <InputEntry />
    <AppFooter />

    <u-button class="mt-5" type="success" @click="$u.route('pages/http/http')">
      Test http
    </u-button>

    <u-button class="mt-5" type="warning" @click="$u.route('pages/login/login')">
      To login
    </u-button>
  </view>
</template>
