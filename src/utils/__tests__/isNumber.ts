import { getRandomNaturalNumber } from 'testUtils';

import { isNumber } from '../guards';

const WITHOUT_NUMBER_VALUES = ['string', true, Symbol('symbol'), null, undefined, {}, []];
const NUMBER_VALUES = [getRandomNaturalNumber(), Math.random()];

describe('isNumber utils', () => {
  it.each(WITHOUT_NUMBER_VALUES)(
    'if the given value is not a number then return false',
    (value) => {
      expect(isNumber(value)).toBeFalse();
    },
  );

  it.each(NUMBER_VALUES)('if the given value is a number then return true', (value) => {
    expect(isNumber(value)).toBeTrue();
  });
});
