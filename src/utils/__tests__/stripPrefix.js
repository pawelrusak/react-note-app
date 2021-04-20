import { stripPrefix } from '../index';

describe('removePrefix utils', () => {
  it('should remove string prefix correctly', () => {
    expect(stripPrefix('foo-bar', 'foo-')).toBe('bar');
    expect(stripPrefix('/foo', '/')).toBe('foo');
    expect(stripPrefix('#bar', '#')).toBe('bar');
  });
});

// slash
