import TestComponentBuilder from './core/testComponentBuilder';
import { testRunnerMixin } from './core/mixin';

export const testComponent = (...args) => {
  const TestComponent = class extends testRunnerMixin(TestComponentBuilder) {};

  return new TestComponent(...args);
};
