import TestComponentBuilder from './core/testComponentBuilder';

export const testComponent = (componentName, renderComponent) =>
  new TestComponentBuilder(componentName, renderComponent);
