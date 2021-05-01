export const testRunnerMixin = (superclass) =>
  class extends superclass {
    #suffixTestNames;

    constructor(renderComponent, { suffixTestNames = '' } = {}) {
      super(renderComponent);

      this.#suffixTestNames = suffixTestNames.trim();
    }

    #getTestSets = () => this.get();

    #setupTestForElement = (element) => {
      this.getRenderComponent();
      const htmlElement = expect(element());

      return htmlElement;
    };

    #getTestName = ({ isInDocument = true, name, attr, value }) => {
      const testName = `should${isInDocument ? '' : "n't"} have the ${name}`;
      const suffix = this.#suffixTestNames;

      if (!attr) {
        return `${testName} ${suffix}`.trim();
      }

      return `${testName}, with ${attr}="${value}" attribute ${suffix} `.trim();
    };

    #testToHave = ({ element, isInDocument, name }) => {
      const testName = this.#getTestName({ element, isInDocument, name });
      it(testName, () => {
        const htmlElement = this.#setupTestForElement(element);

        (isInDocument ? htmlElement : htmlElement.not).toBeInTheDocument();
      });
    };

    #testToHaveWithAttribute = ({ element, name, elementAttributeTests }) => {
      elementAttributeTests.forEach(({ attr, value }) => {
        const testName = this.#getTestName({ element, attr, value, name });

        it(testName, () => {
          const htmlElement = this.#setupTestForElement(element);

          htmlElement.toBeInTheDocument();
          htmlElement.toHaveAttribute(attr, value);
        });
      });
    };

    run = () => {
      const testSets = this.#getTestSets();

      testSets.forEach(({ isInDocument, name, element, elementAttributeTests }) => {
        // check if test sets have the  array of test sets of attributes
        if (elementAttributeTests.length) {
          this.#testToHaveWithAttribute({ element, name, elementAttributeTests });
        } else {
          this.#testToHave({ element, isInDocument, name });
        }
      });
    };
  };
