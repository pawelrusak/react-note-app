import { ROUTES_PATHS } from '~/constants';
import { stripSlashPrefix } from '~/utils';

export const getPairOfPathsAndPageTypes = () =>
  [
    [ROUTES_PATHS.notes, stripSlashPrefix(ROUTES_PATHS.notes) as 'notes'],
    [ROUTES_PATHS.twitters, stripSlashPrefix(ROUTES_PATHS.twitters) as 'twitters'],
    [ROUTES_PATHS.articles, stripSlashPrefix(ROUTES_PATHS.articles) as 'articles'],
  ] as const;

export const getRandomNaturalNumber = (max = 10, min = 1) => {
  if (!Number.isInteger(max) || !Number.isInteger(min)) {
    throw RangeError('The given values have to been integer');
  }

  if (min >= max) {
    throw RangeError(
      'The minimum values specified must be greater than and not equal to the maximum value',
    );
  }

  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
