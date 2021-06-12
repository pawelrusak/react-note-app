import TestComponentBuilder from './core/testComponentBuilder';
import { testRunnerMixin } from './core/mixin';
import type { LikeRender } from './testComponentTypes';

type TestComponentConfig = {
  suffixTestNames?: string | undefined;
};

export const testComponent = (
  renderComponent: LikeRender,
  { suffixTestNames }: TestComponentConfig,
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const TestComponent = class extends testRunnerMixin(TestComponentBuilder) {};

  return new TestComponent(renderComponent, { suffixTestNames });
};
