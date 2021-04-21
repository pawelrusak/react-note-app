class TestComponentBuilder {
  // [toHaveFlag, name, element]
  #tests = [];

  #componentName = null;

  #componentRender = null;

  #toHave = true;

  constructor(name, render) {
    this.#componentName = name;
    this.#componentRender = render;
  }

  toBeInTheDocument = (name, element) => {
    this.#tests.push([this.#toHave, name, element]);
    return this;
  };

  NotToBeInTheDocument = (name, element) => {
    this.#tests.push([!this.#toHave, name, element]);
    return this;
  };

  get not() {
    this.#toHave = !this.#toHave;
    return this;
  }

  start = () => {
    this.#tests.forEach(([testToHave, name, element]) => {
      test(`${this.#componentName} ${testToHave ? 'have' : 'not have'} ${name}`, () => {
        this.#componentRender();
        const expectElement = expect(element());

        (testToHave ? expectElement : expectElement.not).toBeInTheDocument();
      });
    });
  };
}

const testComponent = (name, render) => new TestComponentBuilder(name, render);

export default testComponent;
