export const stripPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const stripSlashPrefix = (str: string) => stripPrefix(str, '/');
