import { routes } from 'routes';
import { stripSlashPrefix } from 'utils';

export const getPairOfPathsAndPageTypes = () => [
  [routes.notes, stripSlashPrefix(routes.notes)],
  [routes.twitters, stripSlashPrefix(routes.twitters)],
  [routes.articles, stripSlashPrefix(routes.articles)],
];
