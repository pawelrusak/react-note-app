import { stripPrefix } from '../index';

describe('stripPrefix utils', () => {
  it('should properly remove the prefix from the string', () => {
    expect(stripPrefix('foo-bar', 'foo-')).toBe('bar');
    expect(stripPrefix('/foo', '/')).toBe('foo');
    expect(stripPrefix('#bar', '#')).toBe('bar');
  });
});
