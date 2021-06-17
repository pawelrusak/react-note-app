/* eslint-disable @typescript-eslint/ban-ts-comment */
import TestSet, { TestConfig } from './testSet';

import type {
  BuildTestable,
  LikeRender,
  Runnable,
  TestQueries,
  GConstructor,
} from '../testComponentTypes';
import type { AttributeTestConfig } from './attributeTestSet';
import type { Modify } from 'commonTypes';

type TestCase = Omit<TestConfig, 'element'> & AttributeTestConfig;

export const testRunnerMixin = <Base extends GConstructor<BuildTestable>>(base: Base) =>
  // @ts-expect-error
  class TestRunner extends base implements Runnable {
    private suffixTestNames;

    constructor(renderComponent: LikeRender, { suffixTestNames = '' } = {}) {
      super(renderComponent);

      this.suffixTestNames = suffixTestNames.trim();
    }

    private getTestSets = () => this.get();

    private setupTestForElement = (element: TestQueries) => {
      this.getRenderComponent();
      const htmlElement = expect(element());

      return htmlElement;
    };

    private getTestName = ({
      isInDocument = true,
      name,
      attr,
      value,
    }: Modify<Partial<TestCase>, { name: string }>) => {
      const testName = `should${isInDocument ? '' : "n't"} have the ${name}`;
      const suffix = this.suffixTestNames;

      if (!attr) {
        return `${testName} ${suffix}`.trim();
      }

      return `${testName}, with ${attr}="${String(value)}" attribute ${suffix} `.trim();
    };

    private testToHave = ({ element, isInDocument, name }: TestConfig) => {
      const testName = this.getTestName({ isInDocument, name });
      it(testName, () => {
        const htmlElement = this.setupTestForElement(element);

        (isInDocument ? htmlElement : htmlElement.not).toBeInTheDocument();
      });
    };

    private testToHaveWithAttribute = ({
      element,
      name,
      elementAttributeTests,
    }: Omit<TestSet, 'isInDocument'>) => {
      elementAttributeTests.forEach(({ attr, value }) => {
        const testName = this.getTestName({ attr, value, name });

        it(testName, () => {
          const htmlElement = this.setupTestForElement(element);

          htmlElement.toBeInTheDocument();
          htmlElement.toHaveAttribute(attr, value);
        });
      });
    };

    run = () => {
      const testSets = this.getTestSets();

      testSets.forEach(({ isInDocument, name, element, elementAttributeTests }) => {
        // check if test sets have the  array of test sets of attributes
        if (elementAttributeTests.length) {
          this.testToHaveWithAttribute({ element, name, elementAttributeTests });
        } else {
          this.testToHave({ element, isInDocument, name });
        }
      });
    };
  };
