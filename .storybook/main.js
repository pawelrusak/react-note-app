const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  /**
   * @see {@link https://github.com/styleguidist/react-docgen-typescript/issues/356#issuecomment-850400428}
   */
  typescript: {
    reactDocgen: 'none',
  },
  webpackFinal: (config) => {
    /**
     * @see {@link https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391|GitHub}
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      '../src/store': path.resolve(__dirname, '../src/store/__mocks__/index.ts'),
      '~': path.resolve(__dirname, '../src/'),
      '~~': path.resolve(__dirname, '../'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
