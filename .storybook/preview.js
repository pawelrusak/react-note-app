import { PageContextDecorator, ThemeDecorator, GlobalStyleDecorator } from './decorators';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { hideNoControlsWarning: true },
};

export const decorators = [ThemeDecorator, GlobalStyleDecorator, PageContextDecorator];
