import { routes } from '~/constants';
import { stripSlashPrefix } from '~/utils';

export const getPairOfPathsAndPageTypes = () =>
  [
    [routes.notes, stripSlashPrefix(routes.notes) as 'notes'],
    [routes.twitters, stripSlashPrefix(routes.twitters) as 'twitters'],
    [routes.articles, stripSlashPrefix(routes.articles) as 'articles'],
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
