<script lang="ts" setup>
import { $u } from 'uview-pro'
import { onMounted, ref } from 'vue'

interface Result {
  code: number
  msg: string
  data: any
}

// 请求结果
const result = ref<any>({})
const loading = ref(true)
const toast = ref(true)

// get请求
function doGet(url = '/demo.json') {
  $u.http.get<Result>(url, {}, { meta: { loading: loading.value, toast: toast.value } }).then((res: Result) => {
    if (res.code === 200) {
      setTimeout(() => {
        $u.toast('请求成功', 'success')
      }, 1000)
    }
    result.value = res
  })
}

// post请求
function doPost(url = '/demo.json') {
  $u.http.post<Result>(url, { name: 'uview-pro' }, { meta: { loading: loading.value, toast: toast.value } }).then((res: Result) => {
    if (res.code === 200) {
      setTimeout(() => {
        $u.toast('请求成功', 'success')
      }, 1000)
    }
    result.value = res
  })
}

// 切换请求方式
function changeMethod(index: number) {
  index === 0 ? doGet() : doPost()
}

// 切换模式，切换请求 Loading 的显示与隐藏
function changeLoading(index: number) {
  loading.value = index === 0
  doGet()
}

// 切换模式，切换请求错误时 Toast 的显示与隐藏
function changeToast(index: number) {
  toast.value = index === 0
  doGet(toast.value ? '/demo1.json' : '/demo.json')
}

onMounted(() => {
  doGet()
})
</script>

<template>
  <view>
    <view>
      <view>
        演示效果
      </view>
      <view>
        <view>
          请求结果为：
        </view>
        <view>
          {{ JSON.stringify(result) }}
        </view>
      </view>
    </view>
    <view>
      <view>
        参数配置
      </view>
      <view>
        <view>
          请求方式
        </view>
        <u-subsection :list="['get', 'post']" @change="changeMethod" />
      </view>
      <view>
        <view>
          请求 Loading
        </view>
        <u-subsection :list="['显示', '隐藏']" @change="changeLoading" />
      </view>
      <view>
        <view>
          请求错误时显示 Toast
        </view>
        <u-subsection :list="['显示', '隐藏']" @change="changeToast" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
