export const stripPrefix = (str, prefix) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const stripSlashPrefix = (str) => stripPrefix(str, '/');
