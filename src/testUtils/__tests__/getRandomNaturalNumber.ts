import { getRandomNaturalNumber } from '../helpers';

/**
 * The Math.random() function returns a floating-point, pseudo-random number
 * in the range 0 to less than 1 (inclusive of 0, but not 1)
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const MATH_RANDOM = {
  MAX_RETURN: 0.99999999,
  MIN_RETURN: 0,
} as const;

export type MathRandomReturnValue = typeof MATH_RANDOM.MAX_RETURN | typeof MATH_RANDOM.MIN_RETURN;

const mockingMathRandom = (returnValue: MathRandomReturnValue) =>
  jest.spyOn(global.Math, 'random').mockReturnValue(returnValue);

describe('getRandomNaturalNumber test utils helper', () => {
  it('throws a range error if the given maximum number is not an integer', () => {
    expect(() => getRandomNaturalNumber(0.2)).toThrow(RangeError);
  });

  it('throws a range error if the given minimum number is not an integer', () => {
    expect(() => getRandomNaturalNumber(3, 0.5)).toThrow(RangeError);
  });

  it('throws a range error if the given minimum  is greater or equal to the maximum', () => {
    expect(() => getRandomNaturalNumber(1, 1)).toThrow(RangeError);

    expect(() => getRandomNaturalNumber(1, 2)).toThrow(RangeError);
  });

  it('the default maximum value should be 10', () => {
    const mockMathRandom = mockingMathRandom(MATH_RANDOM.MAX_RETURN);

    expect(getRandomNaturalNumber()).toBe(10);

    mockMathRandom.mockRestore();
  });

  it('the default minimum value should be 1', () => {
    const mockMathRandom = mockingMathRandom(MATH_RANDOM.MIN_RETURN);

    expect(getRandomNaturalNumber()).toBe(1);

    mockMathRandom.mockRestore();
  });

  it('the maximum return value should be equal to maximum given value', () => {
    const mockMathRandom = mockingMathRandom(MATH_RANDOM.MAX_RETURN);

    expect(getRandomNaturalNumber(5)).toBe(5);

    mockMathRandom.mockRestore();
  });

  it('the minimum return value should be equal to minimum given value', () => {
    const mockMathRandom = mockingMathRandom(MATH_RANDOM.MIN_RETURN);

    expect(getRandomNaturalNumber(20, 3)).toBe(3);

    mockMathRandom.mockRestore();
  });

  it('the return value should be integer', () => {
    expect(Number.isInteger(getRandomNaturalNumber())).toBe(true);
  });
});
