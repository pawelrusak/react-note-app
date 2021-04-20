import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { routes } from 'routes';
import PageContext from 'context';
import { stripSlashPrefix } from 'utils';
import MainTemplate from '../MainTemplate/MainTemplate';

const pathsAndPageTypesPair = [
  [routes.notes, stripSlashPrefix(routes.notes)],
  [routes.twitters, stripSlashPrefix(routes.twitters)],
  [routes.articles, stripSlashPrefix(routes.articles)],
];

describe('<MainTemplate />', () => {
  it.each(pathsAndPageTypesPair)(
    'parse the %s URL path and pass "%s" value to the page context consumer',
    (path, pageType) => {
      const history = createMemoryHistory({ initialEntries: [path] });

      render(
        <Router history={history}>
          <MainTemplate>
            <PageContext.Consumer>
              {(value) => <span data-testid="page-context">{value}</span>}
            </PageContext.Consumer>
          </MainTemplate>
        </Router>,
      );

      expect(screen.getByTestId('page-context').textContent).toBe(pageType);
    },
  );
});
