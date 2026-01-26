<script setup lang="ts">
import { $u } from 'uview-pro'
import { ref } from 'vue'

// 响应数据
const responseData = ref<any>(null)
const loading = ref(false)
const error = ref('')

// 获取数据
async function fetchData() {
  try {
    loading.value = true
    error.value = ''
    responseData.value = null

    // 使用uview-pro的http请求
    const result = await $u.http.get('/mock/data.json', {
      meta: {
        loading: false, // 手动控制loading
        toast: true,
      },
    })

    responseData.value = result
    $u.toast('请求成功')
  }
  catch (err: any) {
    error.value = err.message || '请求失败'
    $u.toast('请求失败', 'error')
  }
  finally {
    loading.value = false
  }
}

// POST请求示例
async function postData() {
  try {
    loading.value = true
    error.value = ''
    responseData.value = null

    const postData = {
      name: 'uView Pro',
      version: '2.0.0',
      timestamp: Date.now(),
    }

    const result = await $u.http.post('/mock/post', postData, {
      meta: {
        loading: false,
        toast: true,
      },
    })

    responseData.value = result
    $u.toast('POST请求成功')
  }
  catch (err: any) {
    error.value = err.message || '请求失败'
    $u.toast('请求失败', 'error')
  }
  finally {
    loading.value = false
  }
}

// 并发请求示例
async function concurrentRequests() {
  try {
    loading.value = true
    error.value = ''
    responseData.value = null

    const requests = [
      $u.http.get('/mock/users'),
      $u.http.get('/mock/posts'),
      $u.http.get('/mock/comments'),
    ]

    const results = await Promise.all(requests)
    responseData.value = {
      users: results[0],
      posts: results[1],
      comments: results[2],
    }

    $u.toast('并发请求成功')
  }
  catch (err: any) {
    error.value = err.message || '并发请求失败'
    $u.toast('并发请求失败', 'error')
  }
  finally {
    loading.value = false
  }
}

// 上传文件示例
async function uploadFile() {
  try {
    loading.value = true
    error.value = ''
    responseData.value = null

    // 这里只是演示，实际需要选择文件
    $u.toast('请选择文件进行上传', 'warning')
  }
  catch (err: any) {
    error.value = err.message || '上传失败'
    $u.toast('上传失败', 'error')
  }
  finally {
    loading.value = false
  }
}

// API示例列表
const apiExamples = [
  {
    title: 'GET 请求',
    desc: '获取数据',
    method: 'GET',
    action: fetchData,
  },
  {
    title: 'POST 请求',
    desc: '提交数据',
    method: 'POST',
    action: postData,
  },
  {
    title: '并发请求',
    desc: '同时请求多个接口',
    method: 'ALL',
    action: concurrentRequests,
  },
  {
    title: '文件上传',
    desc: '上传文件到服务器',
    method: 'UPLOAD',
    action: uploadFile,
  },
]

// HTTP配置示例
const configExamples = [
  {
    title: '全局请求',
    code: `export const RequestConfig = {
            baseUrl: 'https://api.example.com',
            header: {
              'content-type': 'application/json'
            },
            meta: {
              originalData: true,
              toast: true,
              loading: true
            }
          }`,
  },
  {
    title: '全局请求、响应拦截器',
    code: `export const httpInterceptor = {
              request: (config: RequestOptions) => {
                const meta: RequestMeta = config.meta || {}
                if (meta.loading) {
                  // 显示loading
                }
                const userStore = useUserStore()
                if (userStore.token) {
                  config.header.Authorization = \`Bearer \${userStore.token}\`
                }
                return config
              },
              response: (response: any) => {
                const meta: RequestMeta = response.config?.meta || {}
                if (meta.loading) {
                  // 隐藏loading
                }

                // 根据业务处理错误、例如登录失效
                if (response.data.code !== 200) {
                  if (meta.toast) {
                    // 可以弹出错误toast
                  }
                  throw new Error('根据业务处理，可以弹出toast')
                }
                return response.data
              }
            }`,
  },
  {
    title: '全局注册',
    code: `import uViewPro, { httpPlugin } from 'uview-pro'
          import { httpInterceptor, httpRequestConfig } from 'http.interceptor'
          export function createApp() {
            const app = createSSRApp(App)

            // 注册uView-pro
            app.use(uViewPro)

            // 注册http插件
            app.use(httpPlugin, {
              interceptor: httpInterceptor,
              requestConfig: httpRequestConfig
            })

            return { app }
          }`,
  },
]
</script>

<template>
  <app-page nav-title="uni-http网络请求" show-nav-back>
    <view class="app-container">
      <!-- 标题介绍 -->
      <view>
        <u-text text="uni-http 网络请求演示" size="32rpx" bold />
        <u-gap />
        <u-text text="基于uni.request的HTTP请求库，支持拦截器、配置化等特性" size="26rpx" />
      </view>

      <!-- API演示 -->
      <view class="section">
        <u-text text="API 请求演示" size="28rpx" bold />
        <u-gap />
        <view class="api-grid">
          <u-card v-for="(api, index) in apiExamples" :key="index" :title="api.title" :border-radius="0" margin="0">
            <u-text :text="api.desc" size="24rpx" />
            <u-gap />
            <u-button type="primary" size="mini" :loading="loading" @click="api.action">
              {{ api.method }}请求
            </u-button>
          </u-card>
        </view>
      </view>

      <!-- 响应结果 -->
      <view v-if="responseData || error" class="section">
        <u-text text="响应结果" size="28rpx" bold />
        <u-gap />
        <u-card :title="error ? '错误信息' : '成功响应'" :border-radius="0" margin="0">
          <view v-if="error" class="error-content">
            <u-icon name="info-circle" color="error" size="32rpx" />
            <u-text :text="error" color="error" />
          </view>

          <view v-else>
            <u-text text="请求成功，响应数据：" type="success" />
            <view class="json-app-container">
              <u-text :text="JSON.stringify(responseData, null, 2)" size="22rpx" custom-class="code-text" />
            </view>
          </view>
        </u-card>
      </view>

      <!-- 配置示例 -->
      <view class="section">
        <u-text text="配置示例" size="28rpx" bold />
        <u-gap />
        <view class="config-list">
          <u-card
            v-for="(config, index) in configExamples" :key="index" :title="config.title" :border-radius="0"
            margin="0"
          >
            <view class="code-block">
              <u-text :text="config.code" size="22rpx" custom-class="code-text" />
            </view>
          </u-card>
        </view>
      </view>

      <!-- 特性说明 -->
      <view class="section">
        <u-text text="核心特性" size="28rpx" bold />
        <u-gap />
        <u-card :border-radius="0" margin="0" :show-head="false" :show-foot="false">
          <view class="feature-list">
            <view class="feature-item">
              <u-icon name="checkmark-circle" color="success" size="28rpx" />
              <u-text text="支持GET、POST、PUT、DELETE等请求方法" size="26rpx" />
            </view>
            <view class="feature-item">
              <u-icon name="checkmark-circle" color="success" size="28rpx" />
              <u-text text="插件化注册，请求/响应拦截器，支持全局和局部配置" size="26rpx" />
            </view>
            <view class="feature-item">
              <u-icon name="checkmark-circle" color="success" size="28rpx" />
              <u-text text="自动处理loading状态和错误提示" size="26rpx" />
            </view>
            <view class="feature-item">
              <u-icon name="checkmark-circle" color="success" size="28rpx" />
              <u-text text="TypeScript类型支持，支持组合式 API" size="26rpx" />
            </view>
            <view class="feature-item">
              <u-icon name="checkmark-circle" color="success" size="28rpx" />
              <u-text text="适配 H5、App、各主流小程序平台" size="26rpx" />
            </view>
          </view>
        </u-card>
      </view>
    </view>
  </app-page>
</template>

<style lang="scss" scoped>
.app-container {
  padding: 32rpx;
  min-height: 100vh;
}

.section {
  margin: 48rpx 0;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.json-app-container {
  background: $u-bg-gray-light;
  padding: 16rpx;
  border-radius: 8rpx;
  max-height: 300rpx;
  overflow-y: auto;
}

.config-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
</style>
