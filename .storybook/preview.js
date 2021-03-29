import { PageContextDecorator, ThemeDecorator } from './decorators';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { hideNoControlsWarning: true },
};

export const decorators = [ThemeDecorator, PageContextDecorator];
