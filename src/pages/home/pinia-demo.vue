<script setup lang="ts">
import type { DarkMode } from 'uview-pro/types/global'
import { storeToRefs } from 'pinia'
import { $u } from 'uview-pro'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCounterStore, useUserStore } from '@/stores'

const { t } = useI18n()

// 使用现有的counter store
const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)

// 使用拆离的 user store
const userStore = useUserStore()
const { userName, isLoggedIn, preferences } = storeToRefs(userStore)

const inputUserName = ref(userName.value)

// 计算属性
const userInfo = computed(() => ({
  name: userName.value,
  loginStatus: isLoggedIn.value ? t('demo.pinia.loggedIn') : t('demo.pinia.notLoggedIn'),
  preferences: preferences.value,
}))

const notifications = ref(preferences.value.notifications)

const persistenceData = computed(() => {
  return JSON.stringify({
    userName: userName.value,
    isLoggedIn: isLoggedIn.value,
    preferences: preferences.value,
  })
})

function clearData() {
  userStore.clearData()
  $u.toast(t('demo.pinia.clearData'))
}

// 计数器操作
function increment() {
  counterStore.increment()
  $u.toast(`${t('demo.pinia.currentCount')}${counterStore.count}`)
}

function decrement() {
  counterStore.decrement()
  $u.toast(`${t('demo.pinia.currentCount')}${counterStore.count}`)
}

function reset() {
  counterStore.reset()
  $u.toast(t('demo.pinia.reset'))
}

// 用户操作
function login() {
  if (!inputUserName.value || !inputUserName.value.trim()) {
    $u.toast(t('demo.pinia.enterUsernameFirst'), 'error')
    return
  }
  try {
    userStore.login(inputUserName.value)
    $u.toast(t('demo.pinia.welcomeUser', { name: inputUserName.value }))
  }
  catch (err: any) {
    $u.toast(err?.message || t('demo.pinia.login'), 'error')
  }
}

function logout() {
  userStore.logout()
  $u.toast(t('demo.pinia.loggedOut'))
}

// 偏好设置操作
function updateTheme(theme: DarkMode) {
  userStore.updateTheme(theme)
  $u.toast(t('demo.pinia.themeSwitched', { theme }))
}

function toggleNotifications() {
  userStore.toggleNotifications()
  $u.toast(`通知${userStore.preferences.notifications ? t('demo.pinia.notificationEnabled') : t('demo.pinia.notificationDisabled')}`)
}

// 功能示例
const examples = [
  {
    title: '基础计数器',
    desc: '演示状态管理和操作',
    icon: 'plus-circle',
  },
  {
    title: '用户状态',
    desc: '用户登录状态管理',
    icon: 'account',
  },
  {
    title: '偏好设置',
    desc: '应用设置的持久化存储',
    icon: 'setting',
  },
  {
    title: '数据持久化',
    desc: '数据保存和恢复功能',
    icon: 'download',
  },
]

// Pinia特性
const piniaFeatures = [
  'Vue3 Composition API支持',
  'TypeScript类型安全',
  '插件系统扩展',
  '开发工具集成',
  '状态持久化',
  '模块化store组织',
]
</script>

<template>
  <app-page :nav-title="$t('demo.pinia.title')" show-nav-back>
    <view class="app-container">
      <!-- 标题介绍 -->
      <view class="u-m-b-20">
        <u-text :text="$t('demo.pinia.intro')" size="32rpx" bold />
        <u-gap />
        <u-text :text="$t('demo.pinia.introDesc')" size="26rpx" />
      </view>

      <!-- 功能概览 -->
      <view class="section">
        <u-text :text="$t('demo.pinia.featureDemo')" size="28rpx" bold />
        <u-gap />
        <view class="examples-grid">
          <view v-for="(example, index) in examples" :key="index" class="example-card">
            <u-icon :name="example.icon" size="48rpx" color="primary" />
            <u-text :text="example.title" size="28rpx" bold />
            <u-text :text="example.desc" size="24rpx" />
          </view>
        </view>
      </view>

      <!-- 计数器演示 -->
      <view class="section">
        <u-card :title="$t('demo.pinia.basicCounter')" margin="0" border-radius="0" custom-class="counter-card">
          <view class="counter-display">
            <u-text :text="$t('demo.pinia.currentCount')" size="28rpx" bold block align="center" />
            <u-text :text="count.toString()" size="48rpx" bold color="primary" />
          </view>

          <view class="counter-buttons">
            <u-button type="warning" size="mini" :disabled="count <= 0" @click="decrement">
              {{ $t('demo.pinia.decrease') }}
            </u-button>
            <u-button type="primary" size="mini" @click="increment">
              {{ $t('demo.pinia.increase') }}
            </u-button>
            <u-button type="info" size="mini" @click="reset">
              {{ $t('demo.pinia.reset') }}
            </u-button>
          </view>
        </u-card>
      </view>

      <!-- 用户状态演示 -->
      <view class="section">
        <u-card :title="$t('demo.pinia.userStatus')" margin="0" border-radius="0">
          <view class="user-input">
            <u-input v-model="inputUserName" :placeholder="$t('demo.pinia.enterUsername')" clearable :border="true" />
          </view>

          <view class="user-status">
            <u-text :text="$t('demo.pinia.loginStatusText')" size="26rpx" />
            <u-text :text="userInfo.loginStatus" :type="isLoggedIn ? 'success' : 'warning'" size="26rpx" bold />
          </view>
          <view v-if="isLoggedIn" class="user-status">
            <u-text :text="$t('demo.pinia.currentUser')" size="26rpx" />
            <u-text :text="userName" type="success" size="26rpx" bold />
          </view>

          <view class="user-buttons">
            <u-button type="primary" size="mini" :disabled="isLoggedIn" @click="login">
              {{ $t('demo.pinia.login') }}
            </u-button>
            <u-button type="warning" size="mini" :disabled="!isLoggedIn" @click="logout">
              {{ $t('demo.pinia.logout') }}
            </u-button>
          </view>
        </u-card>
      </view>

      <!-- 偏好设置演示 -->
      <view class="section">
        <u-card :title="$t('demo.pinia.preferences')" margin="0" border-radius="0" custom-class="preferences-card">
          <view class="preference-item">
            <u-text :text="$t('demo.pinia.theme')" size="26rpx" />
            <view class="theme-buttons">
              <u-button
                :type="preferences.theme === 'light' ? 'primary' : 'default'" size="mini"
                @click="updateTheme('light')"
              >
                {{ $t('demo.pinia.light') }}
              </u-button>
              <u-button
                :type="preferences.theme === 'dark' ? 'primary' : 'default'" size="mini"
                @click="updateTheme('dark')"
              >
                {{ $t('demo.pinia.dark') }}
              </u-button>
            </view>
          </view>

          <view class="preference-item">
            <u-text :text="$t('demo.pinia.notification')" size="26rpx" />
            <u-switch v-model="notifications" @change="toggleNotifications" />
          </view>

          <view class="preference-item">
            <u-text :text="$t('demo.pinia.language')" size="26rpx" />
            <view>
              <u-text :text="preferences.language" size="26rpx" type="primary" />
            </view>
          </view>
        </u-card>
      </view>

      <!-- 数据持久化演示 -->
      <view class="section">
        <u-card :title="$t('demo.pinia.dataPersistence')" margin="0" border-radius="0" custom-class="persistence-card">
          <u-text :text="$t('demo.pinia.persistenceDemo')" size="24rpx" custom-class="persistence-desc" />
          <u-gap />
          <view class="persistence-data">
            <u-text :text="$t('demo.pinia.currentData')" size="26rpx" />
            <view class="code-block">
              <u-text :text="persistenceData" size="26rpx" color="primary" custom-class="code-text" />
            </view>
          </view>
          <view class="persistence-buttons">
            <u-button type="warning" size="mini" @click="clearData">
              {{ $t('demo.pinia.clearData') }}
            </u-button>
          </view>
        </u-card>
      </view>

      <!-- Pinia特性 -->
      <view class="section">
        <u-text :text="$t('demo.pinia.piniaFeatures')" size="28rpx" bold />
        <u-gap />
        <u-card margin="0" border-radius="0" :show-head="false" custom-class="features-card">
          <view class="features-list">
            <view v-for="(feature, index) in piniaFeatures" :key="index" class="feature-item">
              <u-icon name="checkmark-circle" color="success" size="28rpx" />
              <u-text :text="feature" size="26rpx" />
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
  margin-bottom: 48rpx;

  .section-title {
    margin-bottom: 24rpx;
    display: block;
  }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.example-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $u-bg-white;
  padding: 24rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

.counter-card {
  .counter-display {
    text-align: center;
    margin-bottom: 24rpx;
  }

  .counter-buttons {
    display: flex;
    justify-content: center;
    gap: 16rpx;
  }
}

.user-input {
  margin-bottom: 24rpx;
}

.user-status {
  margin-bottom: 24rpx;
}

.user-buttons {
  display: flex;
  gap: 16rpx;
}

.preferences-card {
  .preference-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .theme-buttons {
      display: flex;
      gap: 12rpx;
    }

  }
}

.persistence-card {
  .persistence-buttons {
    display: flex;
    gap: 16rpx;
  }
}

.features-card {
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 12rpx;
  }
}
</style>
