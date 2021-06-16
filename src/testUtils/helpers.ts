import { routes } from '~/routes';
import { stripSlashPrefix } from '~/utils';

export const getPairOfPathsAndPageTypes = () =>
  [
    [routes.notes, stripSlashPrefix(routes.notes) as 'notes'],
    [routes.twitters, stripSlashPrefix(routes.twitters) as 'twitters'],
    [routes.articles, stripSlashPrefix(routes.articles) as 'articles'],
  ] as const;
