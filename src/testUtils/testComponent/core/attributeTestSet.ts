export type AttributeTestConfig = {
  attr: string;
  value: unknown;
};

class AttributeTestSet {
  readonly attr: string;
  readonly value: unknown;

  constructor({ attr, value }: AttributeTestConfig) {
    this.attr = attr;
    this.value = value;

    Object.freeze(this);
  }
}

export default AttributeTestSet;
