import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'

const Config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  docs: {
    autodocs: true,
  },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', 'storybook-addon-pseudo-states'],
  framework: '@storybook/react-webpack5',
  webpackFinal: async (conf) => {
    if (conf.resolve) {
      conf.resolve.alias = {
        '@': path.resolve(__dirname, '../src'),
      }
    }

    return conf
  },
}

module.exports = Config
