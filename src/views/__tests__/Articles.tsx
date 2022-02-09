import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Articles from '../Articles/Articles';
import { ROUTES_PATHS } from '~/constants';

jest.mock('~/services');

const renderArticles = () =>
  render(<Articles />, {
    path: ROUTES_PATHS.articles,
  });

fetchItemsTestSuite('<Articles />', {
  render: () => renderArticles(),
  variant: 'articles',
});
