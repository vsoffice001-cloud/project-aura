import type { Preview } from '@storybook/react';

// TODO (Step C): Import base styles for Storybook
// import '../src/styles/base.css';
// import '../src/styles/editorial-light.css';
// import '../src/styles/utilities.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      // Match editorial-light/cinematic-dark surface tokens
      default: 'editorial-light',
      values: [
        { name: 'editorial-light', value: '#f5f2f1' },
        { name: 'white', value: '#ffffff' },
        { name: 'cinematic-dark', value: '#0a0a0c' },
      ],
    },
  },
};

export default preview;
