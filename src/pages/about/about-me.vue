<script setup lang="ts"></script>

<template>
  <app-page :nav-title="$t('about.aboutMePage.title')">
    <view class="about-me-page">
      <view class="section-card">
        <view class="section-card__header">
          <u-icon name="account" size="40" color="var(--u-type-primary)" />
          <text class="section-card__title">
            {{ $t('about.aboutMePage.title') }}
          </text>
        </view>
        <view class="section-card__body">
          <view class="about-text">
            <text class="about-text__highlight">
              {{ $t('about.aboutMePage.highlight') }}
            </text>
            <text>
              {{ $t('about.aboutMePage.highlightText') }}
            </text>
          </view>
        </view>
      </view>

      <view class="section-card">
        <view class="section-card__header">
          <u-icon name="chat" size="40" color="var(--u-type-success)" />
          <text class="section-card__title">
            {{ $t('about.aboutMePage.contact') }}
          </text>
        </view>
        <view class="section-card__body">
          <view class="contact-item">
            <view class="contact-item__label">
              {{ $t('about.aboutMePage.wechat') }}
            </view>
            <view class="contact-item__value">
              anyupxing
            </view>
          </view>
          <view class="contact-item">
            <view class="contact-item__label">
              {{ $t('about.aboutMePage.officialAccount') }}
            </view>
            <view class="contact-item__value">
              {{ $t('about.aboutMePage.accountName') }}
            </view>
          </view>
        </view>
      </view>

      <view class="section-card">
        <view class="section-card__header">
          <u-icon name="star" size="40" color="var(--u-type-warning)" />
          <text class="section-card__title">
            {{ $t('about.aboutMePage.intro') }}
          </text>
        </view>
        <view class="section-card__body">
          <view class="intro-text">
            <text>
              {{ $t('about.aboutMePage.introText') }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </app-page>
</template>

<style lang="scss" scoped>
.about-me-page {
    padding: 24rpx;
    background: linear-gradient(180deg, rgba(41, 121, 255, 0.03) 0%, transparent 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24rpx;
}

.section-card {
    background: $u-bg-gray-light;
    border-radius: 20rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;

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
        padding: 24rpx 32rpx 32rpx;
    }
}

.about-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;

    &__highlight {
        font-weight: 700;
        background: linear-gradient(135deg, #2979ff, #19be6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
}

.contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.04);

    &:last-child {
        border-bottom: none;
    }

    &__label {
        font-size: 28rpx;
        color: $u-content-color;
    }

    &__value {
        font-size: 28rpx;
        font-weight: 600;
        color: $u-main-color;
    }
}

.intro-text {
    font-size: 28rpx;
    line-height: 1.8;
    color: $u-content-color;
}
</style>
