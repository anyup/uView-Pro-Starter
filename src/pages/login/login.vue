<script setup lang="ts">
import { $u } from 'uview-pro'
import { computed, ref } from 'vue'

// 手机号输入
const tel = ref('')

/**
 * 按钮样式动态计算
 */
const inputStyle = computed(() => {
  const style: Record<string, string> = {}
  if (tel.value) {
    style.color = '#fff'
    style.backgroundColor = (uni as any).$u?.color?.warning || '#f90'
  }
  return style
})

/**
 * 提交手机号，校验通过跳转验证码页
 */
function submit() {
  if (!$u.test.mobile(tel.value)) {
    $u.toast('手机号格式不正确')
    return
  }
  $u.route({ url: 'pages/template/login/code' })
}
</script>

<template>
  <view class="wrap">
    <view class="top" />
    <view class="content">
      <view class="title">
        欢迎登录
      </view>
      <input v-model="tel" class="u-border-bottom" type="number" placeholder="请输入手机号">
      <view class="tips">
        未注册的手机号验证后自动创建账号
      </view>
      <button :style="[inputStyle]" class="getCaptcha" @tap="submit">
        获取短信验证码
      </button>
      <view class="alternative">
        <view class="password">
          密码登录
        </view>
        <view class="issue">
          遇到问题
        </view>
      </view>
    </view>
    <view class="loginBottom">
      <view class="loginType">
        <view class="wechat item">
          <view class="icon">
            <u-icon size="70" name="weixin-fill" color="rgb(83,194,64)" />
          </view>
          微信
        </view>
        <view class="QQ item">
          <view class="icon">
            <u-icon size="70" name="qq-fill" color="rgb(17,183,233)" />
          </view>
          QQ
        </view>
      </view>
      <view class="hint">
        登录代表同意
        <text class="link">
          用户协议、隐私政策，
        </text>
        并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrap {
    font-size: 28rpx;
    .content {
        width: 600rpx;
        margin: 0 auto;

        .title {
            padding-top: 100rpx;
            text-align: left;
            font-size: 60rpx;
            font-weight: 500;
            margin-bottom: 100rpx;
        }
        input {
            text-align: left;
            margin-bottom: 10rpx;
            padding-bottom: 6rpx;
        }
        .tips {
            color: $u-type-info;
            margin-bottom: 60rpx;
            margin-top: 8rpx;
        }
        .getCaptcha {
            background-color: rgb(253, 243, 208);
            color: $u-tips-color;
            border: none;
            font-size: 30rpx;
            padding: 12rpx 0;

            &::after {
                border: none;
            }
        }
        .alternative {
            color: $u-tips-color;
            display: flex;
            justify-content: space-between;
            margin-top: 30rpx;
        }
    }
    .loginBottom {
        .loginType {
            display: flex;
            padding: 150rpx;
            justify-content: space-between;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: $u-content-color;
                font-size: 28rpx;
            }
        }

        .hint {
            padding: 20rpx 40rpx;
            font-size: 20rpx;
            color: $u-tips-color;

            .link {
                color: $u-type-warning;
            }
        }
    }
}
</style>
