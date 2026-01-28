<script setup lang="ts">
import type { ColorType } from 'uview-pro/types/global'
import { $u } from 'uview-pro'

// 项目统计信息
const projectStats = {
  components: '80+',
  tools: '20+',
  templates: '10+',
  version: '2.0.0',
}
// 项目特性卡片数据
const projectCards = [
  {
    title: 'Vue3 + TypeScript',
    desc: '使用最新的Vue3 Composition API和TypeScript',
    icon: 'thumb-up',
    url: '/pages/home/uview-intro',
    style: 'background: linear-gradient(135deg, #2979ff, #19be6b);',
  },
  {
    title: 'uView Pro组件库',
    desc: '集成80+高质量组件，开箱即用',
    icon: 'bag',
    url: '/pages/home/components-demo',
    style: 'background: linear-gradient(135deg, #4facfe, #00f2fe);',
  },
  {
    title: '多端适配',
    desc: 'H5、小程序、App等多端完美支持',
    icon: 'android-fill',
    url: '/pages/home/createuni-demo',
    style: 'background: linear-gradient(135deg, #43e97b, #38f9d7);',
  },
  {
    title: '最佳实践',
    desc: '集成Pinia、路由、网络请求等最佳实践',
    icon: 'heart',
    url: '/pages/home/pinia-demo',
    style: 'background: linear-gradient(135deg, #fa709a, #fee140);',
  },
]
// 功能模块数据
const features = [
  {
    title: 'uView Pro 介绍',
    desc: '了解uView Pro组件库的特性和优势',
    icon: 'star',
    url: '/pages/home/uview-intro',
    color: 'primary' as ColorType,
  },
  {
    title: 'uni-http网络请求',
    desc: '演示HTTP请求、拦截器等功能',
    icon: 'ie',
    url: '/pages/home/http-demo',
    color: 'success' as ColorType,
  },
  {
    title: 'Pinia持久化',
    desc: '状态管理、数据持久化演示',
    icon: 'file-text',
    url: '/pages/home/pinia-demo',
    color: 'warning' as ColorType,
  },
  {
    title: 'uView Pro组件库',
    desc: '组件使用方法和效果展示',
    icon: 'grid',
    url: '/pages/home/components-demo',
    color: 'error' as ColorType,
  },
  {
    title: '如何使用脚手架创建项目',
    desc: '项目创建工具和模板介绍',
    icon: 'integral',
    url: '/pages/home/create-demo',
    color: 'success' as ColorType,
  },
]

// 跳转到功能页面
function navigateToFeature(url: string, _title: string) {
  uni.navigateTo({
    url,
    success: () => {
      // 跳转成功
    },
    fail: (err) => {
      $u.toast(`跳转失败: ${err.errMsg}`, 'error')
    },
  })
}

// 跳转到页面
function goToUrl(url: string) {
  // #ifdef H5
  window.open(url, '_blank')
  // #endif
  // #ifndef H5
  uni.setClipboardData({
    data: url,
    success: () => {
      $u.toast('链接已复制，请打开浏览器粘贴访问')
    },
  })
  // #endif
}
</script>

<template>
  <app-page nav-title="首页" show-tabbar>
    <view class="app-container">
      <!-- 欢迎区域 -->
      <view class="hero-section">
        <view class="hero-content">
          <u-text :text="$t('common.appName')" size="48rpx" bold color="var(--u-white-color)" />
          <u-text text="基于uni-app + uView Pro的企业级快速启动项目" size="26rpx" color="var(--u-white-color)" />
          <u-text text="Vue3 + TypeScript + 最佳实践" size="24rpx" color="var(--u-content-color)" custom-class="hero-badge" />
        </view>
        <view class="hero-stats">
          <view class="stat-item">
            <u-text :text="projectStats.components" size="36rpx" bold color="var(--u-white-color)" />
            <u-text text="组件" size="24rpx" color="var(--u-white-color)" />
          </view>
          <view class="stat-item">
            <u-text :text="projectStats.tools" size="36rpx" bold color="var(--u-white-color)" />
            <u-text text="工具" size="24rpx" color="var(--u-white-color)" />
          </view>
          <view class="stat-item">
            <u-text :text="projectStats.templates" size="36rpx" bold color="var(--u-white-color)" />
            <u-text text="模板" size="24rpx" color="var(--u-white-color)" />
          </view>
        </view>
      </view>

      <!-- 项目特性（卡片式） -->
      <view class="section-card">
        <view class="section-card__header">
          <u-icon name="star" size="40" color="var(--u-type-success)" />
          <text class="section-card__title">
            项目特性
          </text>
        </view>
        <view class="section-card__body">
          <view class="project-cards">
            <view
              v-for="(card, idx) in projectCards" :key="idx" class="project-card"
              @click="navigateToFeature(card.url || '/pages/home/uview-intro', card.title)"
            >
              <u-card
                :hover="false" :show-head="false" margin="0px" :show-foot="false" :border="false"
                class="project-card__card"
              >
                <view class="card-inner">
                  <view class="card-icon" :style="card.style">
                    <u-icon :name="card.icon" size="28" color="white" />
                  </view>
                  <view class="card-body">
                    <view class="card-title">
                      {{ card.title }}
                    </view>
                    <view class="card-desc">
                      {{ card.desc }}
                    </view>
                  </view>
                </view>
              </u-card>
            </view>
          </view>
        </view>
      </view>

      <!-- 功能演示区块 -->
      <view class="section-card">
        <view class="section-card__header">
          <u-icon name="grid" size="40" color="var(--u-type-primary)" />
          <text class="section-card__title">
            功能演示
          </text>
        </view>
        <view class="section-card__body">
          <u-cell-group>
            <u-cell-item
              v-for="(feature, index) in features" :key="index" :label="feature.desc" :icon="feature.icon"
              :icon-style="{ color: $u.getColor(feature.color) }" :title="feature.title"
              @click="navigateToFeature(feature.url, feature.title)"
            />
          </u-cell-group>
        </view>
      </view>

      <!-- 快速开始区块 -->
      <view class="section-card">
        <view class="section-card__header">
          <u-icon name="play-circle" size="40" color="var(--u-type-warning)" />
          <text class="section-card__title">
            快速开始
          </text>
        </view>
        <view class="section-card__body">
          <view class="quick-start-content">
            <view class="quick-start-text">
              开始探索uView Pro Starter的功能吧！
            </view>
            <view class="quick-start-desc">
              点击上方功能卡片，体验各种特性演示
            </view>
          </view>
          <view class="quick-start-actions">
            <u-button type="primary" @click="goToUrl('http://uviewpro.cn')">
              查看uView Pro文档
            </u-button>
            <u-button type="success" @click="goToUrl('http://h5.uviewpro.cn')">
              查看组件库演示
            </u-button>
          </view>
        </view>
      </view>
    </view>
  </app-page>
</template>

<style lang="scss" scoped>
.app-container {
  padding: 24rpx;
  background: linear-gradient(180deg, rgba(41, 121, 255, 0.03) 0%, transparent 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

// Hero区域
.hero-section {
  position: relative;
  margin: 0 0 8rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 32rpx rgba(41, 121, 255, 0.2);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #2979ff 0%, #19be6b 50%, #ff9900 100%);
    opacity: 0.95;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    animation: heroGlow 8s ease-in-out infinite;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 64rpx 32rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    align-items: center;

    :deep(.hero-badge) {
      display: inline-block;
      padding: 4rpx 12rpx;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 8rpx;
      font-size: 20rpx;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1rpx;
      backdrop-filter: blur(10rpx);
    }
  }

  .hero-stats {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 32rpx 32rpx;

    .stat-item {
      text-align: center;

      &:first-child,
      &:last-child {
        flex: 1;
      }
    }
  }
}

@keyframes heroGlow {

  0%,
  100% {
    transform: rotate(0deg);
    opacity: 0.3;
  }

  50% {
    transform: rotate(180deg);
    opacity: 0.6;
  }
}

// 区块卡片
.section-card {
  background: $u-bg-color;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12rpx 32rpx rgba(41, 121, 255, 0.12);
  }

  &__header {
    padding: 28rpx 32rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
    background: linear-gradient(135deg, rgba(41, 121, 255, 0.05), rgba(25, 190, 107, 0.05));
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);
  }

  &__title {
    font-size: 32rpx;
    font-weight: 700;
    color: $u-main-color;
    letter-spacing: 1rpx;
  }

  &__body {
    // padding: 8rpx 0;
  }
}

.features-section {
  .section-title {
    margin-bottom: 24rpx;
    display: block;
    font-size: 32rpx;
    font-weight: 700;
    color: $u-main-color;
    letter-spacing: 1rpx;
  }

  .features-grid {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    padding: 8rpx 16rpx;
  }

  .feature-card {
    display: flex;
    align-items: center;
    gap: 14rpx;
    padding: 16rpx;
    border-radius: 12rpx;
    background: $u-bg-white;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
    transition: background 0.2s ease, transform 0.12s ease;
    width: 100%;
    flex-wrap: nowrap;
  }

  .feature-card:active {
    background: rgba(41, 121, 255, 0.04);
    transform: translateX(4rpx);
  }

  .feature-card .feature-icon {
    width: 64rpx;
    height: 64rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $u-bg-gray-light;
    flex-shrink: 0;
  }

  .feature-card .feature-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4rpx;
    align-items: flex-start;
    min-width: 0;
    /* allow text to shrink instead of forcing wrapping layout */
  }

  .feature-card .feature-title {
    font-size: 26rpx;
    font-weight: 600;
    color: $u-main-color;
    text-align: left;
  }

  .feature-card .feature-desc {
    font-size: 22rpx;
    color: $u-tips-color;
    line-height: 1.4;
    text-align: left;
    word-break: break-word;
  }

  .feature-card .feature-arrow {
    flex-shrink: 0;
    opacity: 0.6;
    margin-left: 12rpx;
  }

  .project-features {
    padding: 0 32rpx 32rpx;
  }

  .feature-highlight {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 24rpx 0;
    transition: all 0.2s ease;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(25, 190, 107, 0.1));
      transition: width 0.3s ease;
    }

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background: rgba(41, 121, 255, 0.04);
      transform: translateX(4rpx);

      &::before {
        width: 6rpx;
      }
    }

    .feature-highlight-content {
      display: flex;
      align-items: flex-start;
      gap: 16rpx;
      width: 100%;

      .highlight-icon {
        margin-top: 4rpx;
        flex-shrink: 0;
      }

      .highlight-text {
        flex: 1;

        .highlight-title {
          font-size: 30rpx;
          font-weight: 600;
          color: $u-main-color;
          transition: color 0.2s ease;
        }

        &:active .highlight-title {
          color: var(--u-type-primary);
        }

        .highlight-desc {
          font-size: 24rpx;
          color: $u-tips-color;
          line-height: 1.5;
          margin-top: 8rpx;
        }
      }
    }
  }
}

/* 项目特性卡片样式 */
.project-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 12rpx;
}

.project-card {
  display: block;
}

.project-card__card {
  border-radius: 12rpx;
  padding: 12rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.98));
  box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.06);
}

.card-inner {
  display: flex;
  gap: 12rpx;
  align-items: center;
}

.card-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 26rpx;
  font-weight: 700;
  color: $u-main-color;
}

.card-desc {
  font-size: 22rpx;
  color: $u-tips-color;
  margin-top: 6rpx;
}

@media (max-width: 480px) {
  .project-cards {
    grid-template-columns: 1fr;
  }

  .card-title {
    font-size: 24rpx;
  }

  .card-desc {
    font-size: 20rpx;
  }
}

// 快速开始内容
.quick-start-content {
  padding: 24rpx 32rpx 32rpx;
  font-size: 28rpx;
  line-height: 1.8;
  color: $u-content-color;

  .quick-start-text {
    font-weight: 700;
    background: linear-gradient(135deg, #2979ff, #19be6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12rpx;
  }

  .quick-start-desc {
    color: $u-tips-color;
  }
}

.quick-start-actions {
  padding: 24rpx 32rpx;
  display: flex;
  gap: 16rpx;

  :deep(.u-button) {
    flex: 1;
  }
}
</style>
