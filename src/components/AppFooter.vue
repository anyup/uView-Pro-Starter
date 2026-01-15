<script setup lang="ts">
function handleClickGithub() {
  if (window?.open) {
    window.open('https://github.com/anyup/uview-pro')
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
  <view
    i-carbon:logo-github
    absolute
    bottom-1rem left="50%"
    translate-x="-50%"
    color="#888"
    @click="handleClickGithub"
  />
</template>
