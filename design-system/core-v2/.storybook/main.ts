import type { StorybookConfig } from '@storybook/react-vite';

// TODO (Step C): Add stories paths as atoms are promoted
// TODO (Step C): Add @storybook/react-vite + @storybook/addon-a11y to devDependencies

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    // TODO (Step C): '@storybook/addon-a11y'
    // TODO (Step C): '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // TODO (Step C): Add alias @/* → src/* here
    return config;
  },
};

export default config;
