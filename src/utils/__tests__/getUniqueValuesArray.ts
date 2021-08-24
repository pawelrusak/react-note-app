import { getUniqueValuesArray } from '../index';

describe('getUniqueValuesArray utils', () => {
  it('throws a range error if the given length is less than zero', () => {
    expect(() => getUniqueValuesArray(-5)).toThrow(RangeError);
  });

  it('throws a range error if the given length is not integer', () => {
    expect(() => getUniqueValuesArray(0.5)).toThrow(RangeError);
  });

  it('return an array of the given length', () => {
    expect(getUniqueValuesArray(9)).toHaveLength(9);
  });

  it('return an array of unique values', () => {
    const result = getUniqueValuesArray(20);

    const set = new Set(result);
    // eslint-disable-next-line
    // @ts-expect-error
    const arrayOfUniqueValues = [...set];

    expect(result).toEqual(arrayOfUniqueValues);
  });
});
