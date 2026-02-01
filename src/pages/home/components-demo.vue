<script setup lang="ts">
import type { ButtonType } from 'uview-pro/types/global'
import { $u } from 'uview-pro'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 组件演示状态
const buttonLoading = ref(false)
const switchValue = ref(true)
const sliderValue = ref(50)
const inputValue = ref('')
const radioValue = ref('option1')
const checkboxValues = ref(['checkbox1'])
const selectedIndex = ref(0)
const show = ref(false)
const uToastRef = ref()
const modalShow = ref(false)
const modalContent = ref('自定义模态框内容')

// 按钮操作
async function handleButtonClick(type: string) {
  buttonLoading.value = true
  $u.toast(`${type} 按钮被点击`)

  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 1000))
  buttonLoading.value = false
}

// 开关切换
function handleSwitchChange(value: boolean) {
  $u.toast(`开关状态: ${value ? t('demo.pinia.notificationEnabled') : t('demo.pinia.notificationDisabled')}`)
}

// 滑块变化
function handleSliderChange(value: number) {
  sliderValue.value = value
}

// 输入框变化
function handleInputChange(value: string) {
  inputValue.value = value
}

// 单选框变化
function handleRadioChange(value: string) {
  radioValue.value = value
  $u.toast(`选中: ${value}`)
}

// 多选框变化
function handleCheckboxChange(values: string[]) {
  checkboxValues.value = values
}

// 标签页切换
function handleTabChange(index: number) {
  selectedIndex.value = index
  $u.toast(`切换到标签 ${index + 1}`)
}

// 弹出层
function showModal() {
  modalShow.value = true
}

// 消息提示
function showToast() {
  uToastRef.value.show({
    title: '这是一条成功消息',
    type: 'success',
  })
}

// 加载提示
async function showLoading() {
  show.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  show.value = false
}

// 组件分类
const componentCategories = [
  {
    title: '基础组件',
    components: [
      { name: 'Button', desc: '按钮组件', demo: '多种样式和状态' },
      { name: 'Icon', desc: '图标组件', demo: '丰富的图标库' },
      { name: 'Text', desc: '文本组件', demo: '文本样式控制' },
    ],
  },
  {
    title: '表单组件',
    components: [
      { name: 'Input', desc: '输入框', demo: '多种输入类型' },
      { name: 'Switch', desc: '开关', demo: '切换状态控制' },
      { name: 'Radio', desc: '单选框', demo: '单项选择' },
      { name: 'Checkbox', desc: '多选框', demo: '多项选择' },
    ],
  },
  {
    title: '数据展示',
    components: [
      { name: 'Card', desc: '卡片', demo: '内容展示容器' },
      { name: 'Badge', desc: '徽章', demo: '状态提示' },
      { name: 'Tag', desc: '标签', demo: '内容标记' },
    ],
  },
  {
    title: '反馈组件',
    components: [
      { name: 'Toast', desc: '消息提示', demo: '轻提示' },
      { name: 'Modal', desc: '模态框', demo: '确认对话框' },
      { name: 'Loading', desc: '加载', demo: '加载状态' },
    ],
  },
]

// 按钮类型
const buttonTypes = [
  { type: 'primary' as ButtonType, text: '主要' },
  { type: 'success' as ButtonType, text: '成功' },
  { type: 'warning' as ButtonType, text: '警告' },
  { type: 'error' as ButtonType, text: '错误' },
]

// 标签页数据
const tabList = [
  { name: '标签1' },
  { name: '标签2' },
  { name: '标签3' },
]
</script>

<template>
  <app-page :nav-title="$t('demo.components.title')" show-nav-back>
    <view class="app-container">
      <!-- 标题介绍 -->
      <view class="intro-section">
        <u-text :text="$t('demo.components.intro')" size="32rpx" bold />
        <u-text :text="$t('demo.components.introDesc')" size="26rpx" />
      </view>

      <!-- 按钮组件 -->
      <view class="section">
        <u-text :text="`${$t('demo.components.button')} (u-button)`" size="28rpx" bold />

        <u-card custom-class="demo-card">
          <view class="button-row">
            <u-button
              v-for="btn in buttonTypes" :key="btn.type" :type="btn.type" size="mini"
              @click="handleButtonClick(btn.text)"
            >
              {{ btn.text }}
            </u-button>
          </view>

          <view class="button-row">
            <u-button type="primary" size="mini" :loading="buttonLoading" @click="handleButtonClick($t('demo.components.loading'))">
              {{ $t('demo.components.loading') }}
            </u-button>
            <u-button type="primary" size="mini" disabled>
              {{ $t('demo.components.loading') }}
            </u-button>
          </view>
        </u-card>
      </view>

      <!-- 表单组件 -->
      <view class="section">
        <u-text :text="$t('demo.components.formComponents')" size="28rpx" bold />

        <!-- 输入框 -->
        <u-card :title="`${$t('demo.components.input')} (u-input)`" custom-class="demo-card">
          <u-input v-model="inputValue" :placeholder="$t('demo.pinia.enterUsername')" clearable @change="handleInputChange" />
        </u-card>

        <!-- 开关 -->
        <u-card :title="`${$t('demo.components.switch')} (u-switch)`" custom-class="demo-card">
          <view class="switch-row">
            <u-text size="26rpx">
              {{ $t('demo.components.switch') + $t('demo.pinia.loginStatusText') }} {{ switchValue ? $t('demo.pinia.notificationEnabled') : $t('demo.pinia.notificationDisabled') }}
            </u-text>
            <u-switch v-model="switchValue" @change="handleSwitchChange" />
          </view>
        </u-card>

        <!-- 滑块 -->
        <u-card :title="`${$t('demo.components.switch')} (u-slider)`" custom-class="demo-card">
          <view class="slider-row">
            <u-text :text="$t('demo.components.switch') + $t('demo.pinia.currentCount')" size="26rpx" />
            <u-text :text="sliderValue.toString()" size="26rpx" color="primary" bold />
          </view>
          <u-slider v-model="sliderValue" :min="0" :max="100" @change="handleSliderChange" />
        </u-card>

        <!-- 单选框 -->
        <u-card :title="`${$t('demo.components.radio')} (u-radio)`" custom-class="demo-card">
          <u-radio-group v-model="radioValue" @change="handleRadioChange">
            <u-radio name="option1" :checked="radioValue === 'option1'">
              {{ $t('demo.components.demo') }}1
            </u-radio>
            <u-radio name="option2" :checked="radioValue === 'option2'">
              {{ $t('demo.components.demo') }}2
            </u-radio>
            <u-radio name="option3" :checked="radioValue === 'option3'">
              {{ $t('demo.components.demo') }}3
            </u-radio>
          </u-radio-group>
        </u-card>

        <!-- 多选框 -->
        <u-card v-if="false" :title="`${$t('demo.components.checkbox')} (u-checkbox)`" custom-class="demo-card">
          <u-checkbox-group v-model="checkboxValues" @change="handleCheckboxChange">
            <u-checkbox name="checkbox1" :checked="checkboxValues.includes('checkbox1')">
              {{ $t('demo.components.demo') }}1
            </u-checkbox>
            <u-checkbox name="checkbox2" :checked="checkboxValues.includes('checkbox2')">
              {{ $t('demo.components.demo') }}2
            </u-checkbox>
            <u-checkbox name="checkbox3" :checked="checkboxValues.includes('checkbox3')">
              {{ $t('demo.components.demo') }}3
            </u-checkbox>
          </u-checkbox-group>
        </u-card>
      </view>

      <!-- 导航组件 -->
      <view class="section">
        <u-text :text="$t('demo.components.dataDisplay')" size="28rpx" bold />

        <!-- 标签页 -->
        <u-card :title="`${$t('demo.components.tag')} (u-tabs)`" custom-class="demo-card">
          <u-tabs :current="selectedIndex" :list="tabList" @change="handleTabChange" />
          <view class="tab-content">
            <u-text :text="`${$t('demo.components.demo')} ${selectedIndex + 1}${$t('demo.components.contentContainer')}`" size="26rpx" />
          </view>
        </u-card>
      </view>

      <!-- 反馈组件 -->
      <view class="section">
        <u-text :text="$t('demo.components.feedbackComponents')" size="28rpx" bold />
        <u-gap />
        <view class="feedback-buttons">
          <u-button type="primary" size="mini" @click="showToast">
            {{ $t('demo.components.toast') }}
          </u-button>
          <u-button type="success" size="mini" @click="showModal">
            {{ $t('demo.components.modal') }}
          </u-button>
          <u-button type="warning" size="mini" @click="showLoading">
            {{ $t('demo.components.loading') }}
          </u-button>
        </view>
      </view>

      <u-loading-popup v-model="show" />
      <u-toast ref="uToastRef" />
      <u-modal v-model="modalShow" :content="modalContent" :show-cancel-button="true" />

      <!-- 组件分类 -->
      <view class="section">
        <u-text :text="$t('demo.components.dataDisplay')" size="28rpx" bold />

        <view class="categories-list">
          <u-card
            v-for="(category, index) in componentCategories" :key="index" :title="category.title"
            custom-class="demo-card"
          >
            <view class="components-list">
              <view v-for="(component, compIndex) in category.components" :key="compIndex" class="component-item">
                <view class="component-info">
                  <u-text :text="component.name" size="28rpx" bold />
                  <u-text :text="component.desc" size="24rpx" />
                </view>
                <u-tag :text="component.demo" type="primary" size="mini" />
              </view>
            </view>
          </u-card>
        </view>
      </view>
    </view>
  </app-page>
</template>

<style lang="scss" scoped>
.app-container {
  padding: 32rpx;
  min-height: 100vh;
}

.intro-section {
  margin-bottom: 48rpx;
}

.section {
  margin-bottom: 48rpx;
}

:deep(.demo-card) {
  margin: 24rpx 0 24rpx 0 !important;
  border-radius: 0 !important;

  &:last-child {
    margin-bottom: 0;
  }
}

.button-row {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.switch-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.tab-content {
  padding: 24rpx 0;
  text-align: center;
}

.feedback-buttons {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.components-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.component-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 0;
  border-bottom: 1rpx solid $u-border-color;

  &:last-child {
    border-bottom: none;
  }

  .component-info {
    flex: 1;
  }
}
</style>
