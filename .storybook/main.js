module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: (config) => {
    config.resolve.alias['store'] = require.resolve('../src/store/__mocks__/index.js');
    return config;
  },
};
