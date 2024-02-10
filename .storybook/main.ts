import type { StorybookConfig } from '@storybook-vue/nuxt'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {}
  },
  docs: { autodocs: 'tag' },

  // Viteの設定をカスタマイズするためのフックを追加
  async viteFinal(config, { configType }) {
    // configType は 'DEVELOPMENT' または 'PRODUCTION' のいずれかです
    // 'DEVELOPMENT' の場合、開発用の設定を追加できます
    // 'PRODUCTION' の場合、本番用の設定を追加できます

    // Viteの設定をカスタマイズします
    return mergeConfig(config, {
      server: {
        hmr: {
          // clientPortを443に設定
          clientPort: 443,
          // 必要に応じて他のHMR設定をここに追加
        },
      },
    });
  },

}
export default config
