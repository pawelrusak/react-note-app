import { join } from '../index';

describe('join utils', () => {
  it.each([
    [null, 'null'],
    [undefined, 'undefined'],
    [10_000, '10000'],
    [true, 'true'],
    ['foo', 'foo'],
  ])('convert primitive value to correct string', (value, result) => {
    expect(join(value)).toBe(result);
  });

  it.each([
    [[1, 2], '12'],
    [[null, 'Foo'], 'nullFoo'],
    [[undefined, 'Bar'], 'undefinedBar'],
    [[true], 'true'],
    [['foo', 'bar'], 'foobar'],
  ])('convert array to correct string', (value, result) => {
    expect(join(value)).toBe(result);
  });
});
