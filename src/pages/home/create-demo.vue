<script setup lang="ts">
import { $u } from 'uview-pro'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 脚手架特性
const features = [
  {
    icon: 'setting',
    title: '快速创建',
    desc: '一键创建uni-app项目，支持多种模板',
  },
  {
    icon: 'android-fill',
    title: '多端支持',
    desc: '内置多端适配配置，开箱即用',
  },
  {
    icon: 'heart',
    title: '最佳实践',
    desc: '集成业界最佳实践和开发规范',
  },
  {
    icon: 'star',
    title: '组件集成',
    desc: '可选集成uView Pro等UI组件库',
  },
]

// 安装步骤
const installSteps = [
  {
    step: '1',
    title: '全局安装',
    command: 'pnpm create uni@latest\n或 pnpm create unibest@latest',
    desc: '使用create-uni脚手架或unibest脚手架创建项目',
  },
  {
    step: '2',
    title: '选择模板',
    command: '选择项目模板和配置',
    desc: '根据需求选择合适的模板',
  },
  {
    step: '3',
    title: '安装依赖',
    command: 'cd my-project && pnpm install',
    desc: '进入项目目录安装依赖',
  },
  {
    step: '4',
    title: '启动开发',
    command: 'pnpm run dev:h5',
    desc: '启动开发服务器开始开发',
  },
]

// 支持的平台
const platforms = [
  {
    name: 'H5',
    icon: 'ie',
    desc: '浏览器平台，支持现代浏览器',
  },
  {
    name: '小程序',
    icon: 'weixin-fill',
    desc: '微信、支付宝、抖音、头条',
  },
  {
    name: 'APP',
    icon: 'android-fill',
    desc: 'Android/iOS App',
  },
  {
    name: '鸿蒙',
    icon: 'integral-fill',
    desc: 'HarmonyOS App',
  },
]

// 开发命令
const commands = [
  {
    command: 'npm run dev:h5',
    desc: '启动H5开发服务器',
  },
  {
    command: 'npm run dev:mp-weixin',
    desc: '启动微信小程序开发',
  },
  {
    command: 'npm run dev:mp-alipay',
    desc: '启动支付宝小程序开发',
  },
  {
    command: 'npm run build:h5',
    desc: '构建H5生产版本',
  },
  {
    command: 'npm run build:mp-weixin',
    desc: '构建微信小程序',
  },
]

// 复制命令到剪贴板
function copyCommand(command: string) {
  uni.setClipboardData({
    data: command,
    success: () => {
      $u.toast(t('common.copyCommandSuccess'))
    },
  })
}
</script>

<template>
  <app-page :nav-title="$t('demo.create.title')" show-nav-back>
    <view class="app-container">
      <!-- 标题介绍 -->
      <view class="intro-section">
        <u-text :text="$t('demo.create.subtitle')" size="32rpx" bold />
        <u-text :text="$t('demo.create.subtitleDesc')" size="26rpx" bold />
        <u-text text="v1.0.0" size="24rpx" color="primary" />
      </view>

      <!-- 特性介绍 -->
      <view class="section">
        <u-text :text="$t('demo.create.coreFeatures')" size="28rpx" bold />
        <u-gap />
        <view class="features-grid">
          <view v-for="(feature, index) in features" :key="index" class="feature-card">
            <u-icon :name="feature.icon" size="48rpx" color="primary" />
            <u-text :text="feature.title" size="28rpx" bold />
            <u-text :text="feature.desc" size="24rpx" />
          </view>
        </view>
      </view>

      <!-- 安装使用 -->
      <view class="section">
        <u-text :text="$t('demo.create.installAndUse')" size="28rpx" bold />
        <u-gap />
        <u-card :show-head="false" margin="0">
          <view class="install-steps">
            <view v-for="(step, index) in installSteps" :key="index" class="install-step">
              <view class="step-number">
                {{ step.step }}
              </view>
              <view class="step-content">
                <u-text :text="step.title" size="28rpx" bold class="step-title" />
                <view class="command-block">
                  <u-text :text="step.command" size="24rpx" />
                  <u-icon name="copy" size="28rpx" color="grey-5" @click="copyCommand(step.command)" />
                </view>
                <u-text :text="step.desc" size="24rpx" />
              </view>
            </view>
          </view>
        </u-card>
      </view>

      <!-- 支持平台 -->
      <view class="section">
        <u-text :text="$t('demo.create.supportedPlatforms')" size="28rpx" bold />
        <u-gap />
        <view class="platforms-grid">
          <view v-for="(platform, index) in platforms" :key="index" class="platform-card">
            <u-icon :name="platform.icon" size="48rpx" color="primary" />
            <u-text :text="platform.name" size="28rpx" bold />
            <u-text :text="platform.desc" size="24rpx" />
          </view>
        </view>
      </view>

      <!-- 开发命令 -->
      <view class="section">
        <u-text :text="$t('demo.create.commonCommands')" size="28rpx" bold />
        <u-gap />
        <u-card :show-head="false" margin="0">
          <view class="commands-list">
            <view v-for="(cmd, index) in commands" :key="index" class="command-item">
              <view class="command-block">
                <u-text :text="cmd.command" size="26rpx" color="primary" />
                <u-icon name="copy" size="28rpx" color="grey-5" @click="copyCommand(cmd.command)" />
              </view>
              <u-text :text="cmd.desc" size="24rpx" />
            </view>
          </view>
        </u-card>
      </view>

      <!-- 项目结构 -->
      <view class="section">
        <u-text :text="$t('demo.create.projectStructure')" size="28rpx" bold />
        <u-gap />
        <u-card :show-head="false" margin="0">
          <view class="structure-tree">
            <view class="tree-item">
              <u-text text="my-project/" size="26rpx" bold color="primary" />
            </view>
            <view class="tree-item sub">
              <u-text text="├── src/" size="24rpx" />
              <u-text :text="$t('demo.create.structure.srcDir')" size="22rpx" />
            </view>
            <view class="tree-item sub">
              <u-text text="├── pages.json" size="24rpx" />
              <u-text :text="$t('demo.create.structure.pagesConfig')" size="22rpx" />
            </view>
            <view class="tree-item sub">
              <u-text text="├── manifest.json" size="24rpx" />
              <u-text :text="$t('demo.create.structure.appConfig')" size="22rpx" />
            </view>
            <view class="tree-item sub">
              <u-text text="├── package.json" size="24rpx" />
              <u-text :text="$t('demo.create.structure.depsConfig')" size="22rpx" />
            </view>
            <view class="tree-item sub">
              <u-text text="├── tsconfig.json" size="24rpx" />
              <u-text :text="$t('demo.create.structure.tsConfig')" size="22rpx" />
            </view>
            <view class="tree-item sub">
              <u-text text="└── vite.config.ts" size="24rpx" />
              <u-text :text="$t('demo.create.structure.viteConfig')" size="22rpx" />
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

.intro-section {
  text-align: center;
  margin-bottom: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .page-title {
    display: block;
    margin-bottom: 16rpx;
  }

  .page-desc {
    display: block;
    margin-bottom: 12rpx;
  }

  .version {
    display: block;
  }
}

.section {
  margin-bottom: 48rpx;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.feature-card {
  background: $u-bg-white;
  padding: 24rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.install-steps {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.install-step {
  display: flex;
  gap: 16rpx;

  .step-number {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
    background: $u-type-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--u-white-color);
  }

  .step-content {
    flex: 1;

    .step-title {
      display: block;
      margin-bottom: 8rpx;
    }

    .command-block {
      display: flex;
      align-items: center;
      gap: 12rpx;
      background: $u-bg-gray-light;
      padding: 12rpx 16rpx;
      border-radius: 8rpx;
      margin-bottom: 8rpx;

      .command-text {
        flex: 1;
        font-family: 'Monaco', 'Consolas', monospace;
      }
    }

  }
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.platform-card {
  background: $u-bg-white;
  padding: 24rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.commands-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.command-item {
  .command-block {
    display: flex;
    align-items: center;
    gap: 12rpx;
    background: $u-bg-gray-light;
    padding: 12rpx 16rpx;
    border-radius: 8rpx;
    margin-bottom: 8rpx;

    .command-text {
      flex: 1;
      font-family: 'Monaco', 'Consolas', monospace;
    }
  }

  .command-desc {
    display: block;
  }
}

.structure-tree {
  .tree-item {
    margin-bottom: 8rpx;

    &.sub {
      margin-left: 32rpx;
    }
  }
}
</style>
