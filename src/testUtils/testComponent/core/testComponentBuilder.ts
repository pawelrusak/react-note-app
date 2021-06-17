import AttributeTestSet, { AttributeTestConfig } from './attributeTestSet';
import TestSet, { TestConfig } from './testSet';

import type {
  TestQueries,
  LikeRender,
  Negotiable,
  BeInTheDocumentMatchable,
  AttributeTestable,
  Getable,
  Renderable,
} from '../testComponentTypes';
import type { Optional } from '~/commonTypes';

class TestComponentBuilder
  implements Negotiable, BeInTheDocumentMatchable, AttributeTestable, Getable, Renderable
{
  private tests: TestSet[] = [];

  private renderComponent: LikeRender;

  private isInDocument = false;

  constructor(render: LikeRender) {
    this.renderComponent = render;
  }

  private createTestSet = ({
    name,
    element,
    isInDocument = !this.isInDocument,
  }: Optional<TestConfig, 'isInDocument'>) =>
    new TestSet({
      name,
      element,
      isInDocument,
    });

  private createAttributeTestSet = ({ attr, value }: AttributeTestConfig) =>
    new AttributeTestSet({ attr, value });

  private addAttributesTestSetToCurrentElement = ({ attr, value }: AttributeTestConfig) => {
    const lastTestSet = this.tests[this.tests.length - 1];

    // add the attribute test set only when the element is in the DOM
    if (lastTestSet.isInDocument) {
      const lastTestSetElementAttributeTestSetsReference = lastTestSet.elementAttributeTests;
      const attributeTestSet = this.createAttributeTestSet({ attr, value });

      lastTestSetElementAttributeTestSetsReference.push(attributeTestSet);
    }
  };

  withAttribute = (attr: string, value: unknown) => {
    this.addAttributesTestSetToCurrentElement({ attr, value });

    return this;
  };

  toBeInTheDocument = (name: string, element: TestQueries) => {
    const testSet = this.createTestSet({ name, element });

    this.tests.push(testSet);

    this.isInDocument = false;
    return this;
  };

  get not() {
    this.isInDocument = !this.isInDocument;
    return this;
  }

  get = () => this.tests;

  getRenderComponent = () => this.renderComponent();
}

export default TestComponentBuilder;
