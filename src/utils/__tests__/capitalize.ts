import { capitalize } from '../index';

describe('capitalize test utils helper', () => {
  it('capitalize first letter', () => {
    expect(capitalize('notes')).toBe('Notes');
    expect(capitalize('articles')).toBe('Articles');
    expect(capitalize('twitters')).toBe('Twitters');
    expect(capitalize('while it is most...')).toBe('While it is most...');
  });

  it('if the first letter is capitalize then it does nothing', () => {
    expect(capitalize('Notes')).toBe('Notes');
    expect(capitalize('Articles')).toBe('Articles');
    expect(capitalize('Twitters')).toBe('Twitters');
    expect(capitalize('While it is most...')).toBe('While it is most...');
  });
});
