import TestSet from './testSet';
import AttributeTestSet from './attributeTestSet';

class TestComponentBuilder {
  /** @type {TestSet[]} */
  #tests = [];

  #renderComponent = null;

  #isInDocument = false;

  constructor(render) {
    this.#renderComponent = render;
  }

  #createTestSet = ({ name, element, isInDocument = !this.#isInDocument }) =>
    new TestSet({
      name,
      element,
      isInDocument,
    });

  #createAttributeTestSet = ({ attr, value }) => new AttributeTestSet({ attr, value });

  #addAttributesTestSetToCurrentElement = ({ attr, value }) => {
    const lastTestSet = this.#tests[this.#tests.length - 1];

    // add the attribute test set only when the element is in the DOM
    if (lastTestSet.isInDocument) {
      const lastTestSetElementAttributeTestSetsReference = lastTestSet.elementAttributeTests;
      const attributeTestSet = this.#createAttributeTestSet({ attr, value });

      lastTestSetElementAttributeTestSetsReference.push(attributeTestSet);
    }
  };

  withAttribute = (attr, value) => {
    this.#addAttributesTestSetToCurrentElement({ attr, value });

    return this;
  };

  toBeInTheDocument = (name, element) => {
    const testSet = this.#createTestSet({ name, element });

    this.#tests.push(testSet);

    this.#isInDocument = false;
    return this;
  };

  get not() {
    this.#isInDocument = !this.#isInDocument;
    return this;
  }

  get = () => this.#tests;

  getRenderComponent = () => this.#renderComponent();
}

export default TestComponentBuilder;
