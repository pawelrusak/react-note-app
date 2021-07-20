import { PageContextDecorator, ThemeDecorator, GlobalStyleDecorator } from './decorators';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      date: /(created|date)/,
    },
  },
};

export const decorators = [ThemeDecorator, GlobalStyleDecorator, PageContextDecorator];
