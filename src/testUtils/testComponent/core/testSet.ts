import AttributeTestSet from './attributeTestSet';

import type { TestQueries } from '../testComponentTypes';

export type TestConfig = {
  isInDocument: boolean;
  name: string;
  element: TestQueries;
};

class TestSet {
  readonly isInDocument: boolean;
  readonly name: string;
  readonly element: TestQueries;
  readonly elementAttributeTests: Array<AttributeTestSet>;

  constructor({ isInDocument, name, element }: TestConfig) {
    this.isInDocument = isInDocument;
    this.name = name;
    this.element = element;
    this.elementAttributeTests = [];

    Object.freeze(this);
  }
}

export default TestSet;
