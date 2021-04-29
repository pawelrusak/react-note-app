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

    // add the attribute test set only when the element is in DOM
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

  start = () => {
    this.#tests.forEach(({ isInDocument, name, element, elementAttributeTests }) => {
      // check if test sets have the attribute tests
      if (elementAttributeTests.length) {
        elementAttributeTests.forEach(({ attr, value }) => {
          test(`
           ${
             isInDocument ? 'have' : 'not have'
           } ${name}, with attribute: ${attr}="${value}"`, () => {
            this.#renderComponent();
            const testedElement = expect(element());

            testedElement.toBeInTheDocument();
            testedElement.toHaveAttribute(attr, value);
          });
        });
      } else {
        test(`
        ${isInDocument ? 'have' : 'not have'} ${name}`, () => {
          this.#renderComponent();
          const testedElement = expect(element());

          (isInDocument ? testedElement : testedElement.not).toBeInTheDocument();
        });
      }
    });
  };
}

export default TestComponentBuilder;
