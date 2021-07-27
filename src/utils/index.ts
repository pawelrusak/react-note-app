export const stripPrefix = (str: string, prefix: string) =>
  str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const stripSlashPrefix = (str: string) => stripPrefix(str, '/');

export const getEarlierDateOfDay = (numberOfPreviousDays: number) => {
  const today = new Date();
  const previousDay = new Date();

  previousDay.setDate(today.getDate() - numberOfPreviousDays);

  return previousDay;
};

/**
 * @link https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
 */
export const getUniqueValuesArray = (length: number) => Array.from(Array(length).keys());
