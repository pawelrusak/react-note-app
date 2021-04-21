class TestComponentBuilder {
  // [toHaveFlag, name, element]
  #tests = [];

  #testComponentName = null;

  #testComponentRender = null;

  constructor(name, render) {
    this.#testComponentName = name;
    this.#testComponentRender = render;
  }

  toBeInTheDocument = (name, element) => {
    this.#tests.push([true, name, element]);
    return this;
  };

  NotToBeInTheDocument = (name, element) => {
    this.#tests.push([false, name, element]);
    return this;
  };

  start = () => {
    this.#tests.forEach(([testToHave, name, element]) => {
      test(`${this.#testComponentName} ${testToHave ? 'have' : 'not have'} ${name}`, () => {
        this.#testComponentRender();
        const handleExpect = expect(element());

        if (testToHave) {
          return handleExpect.toBeInTheDocument();
        }

        return handleExpect.not.toBeInTheDocument();
      });
    });
  };
}

const testComponent = (name, render) => new TestComponentBuilder(name, render);

export default testComponent;
