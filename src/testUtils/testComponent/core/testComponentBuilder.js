class TestComponentBuilder {
  // [isInDocument, name, element]
  #tests = [];

  #componentName = null;

  #renderComponent = null;

  #isInDocument = false;

  constructor(name, render) {
    this.#componentName = name;
    this.#renderComponent = render;
  }

  toBeInTheDocument = (name, element) => {
    this.#tests.push([!this.#isInDocument, name, element]);
    this.#isInDocument = false;
    return this;
  };

  get not() {
    this.#isInDocument = !this.#isInDocument;
    return this;
  }

  start = () => {
    this.#tests.forEach(([isInDocument, name, element]) => {
      test(`${this.#componentName} ${isInDocument ? 'have' : 'not have'} ${name}`, () => {
        this.#renderComponent();
        const testedElement = expect(element());

        (isInDocument ? testedElement : testedElement.not).toBeInTheDocument();
      });
    });
  };
}

export default TestComponentBuilder;
