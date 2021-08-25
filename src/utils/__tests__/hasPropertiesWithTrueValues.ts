import { hasPropertiesWithTrueValues } from '../index';

const objWithTrueValues = {
  firstTrueProp: true,
  secondTrueProp: true,
};

describe('hasPropertiesWithTrueValues utils', () => {
  it('should return true when object has every properties with true values', () => {
    expect(hasPropertiesWithTrueValues(objWithTrueValues)).toBeTrue();
  });

  it('should return false when object has some property with false value', () => {
    const objWithTrueAndFalseValues = {
      ...objWithTrueValues,
      falseProp: false,
    };

    expect(hasPropertiesWithTrueValues(objWithTrueAndFalseValues)).toBeFalse();
  });

  it('should return true when object has some property with false value, but we check only defined properties with true value', () => {
    const objWithMixValues = {
      emptyStringProp: '',
      stringProp: 'foo',
      trueProp: true,
      falseProp: false,
      undefinedProp: undefined,
    };

    expect(hasPropertiesWithTrueValues(objWithMixValues, ['trueProp'])).toBeTrue();
  });

  it('should return false when object has every properties with true values, but we check not defined properties', () => {
    type LocalObjWithTrueValues = {
      firstTrueProp: true;
      secondTrueProp: true;
      notDefinedProp?: unknown;
    };

    const localObjWithTrueValues: LocalObjWithTrueValues = {
      firstTrueProp: true,
      secondTrueProp: true,
    };

    expect(
      hasPropertiesWithTrueValues(localObjWithTrueValues, [
        'firstTrueProp',
        'secondTrueProp',
        'notDefinedProp',
      ]),
    ).toBeFalse();
  });
});
