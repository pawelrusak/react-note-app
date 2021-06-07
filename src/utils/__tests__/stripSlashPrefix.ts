import { stripSlashPrefix } from '../index';

describe('stripSlashPrefix utils', () => {
  it('should properly remove the slash prefix from the string', () => {
    expect(stripSlashPrefix('/bar')).toBe('bar');
    expect(stripSlashPrefix('/foo')).toBe('foo');
    expect(stripSlashPrefix('/notes')).toBe('notes');
    expect(stripSlashPrefix('/twitter/foo')).toBe('twitter/foo');
  });

  it("shouldn't remove the first character from the string", () => {
    expect(stripSlashPrefix('foo-bar')).toBe('foo-bar');
    expect(stripSlashPrefix('#bar')).toBe('#bar');
  });
});
