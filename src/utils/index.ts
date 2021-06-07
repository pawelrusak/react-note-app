export const stripPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const stripSlashPrefix = (str: string) => stripPrefix(str, '/');

export const getEarlierDateOfDay = (numberOfPreviousDays: number) => {
  const today = new Date();
  const previousDay = new Date();

  previousDay.setDate(today.getDate() - numberOfPreviousDays);

  return previousDay;
};
