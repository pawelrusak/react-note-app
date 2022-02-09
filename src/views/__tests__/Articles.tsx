import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Articles from '../Articles/Articles';
import { routes } from '~/constants';

jest.mock('~/services');

const renderArticles = () =>
  render(<Articles />, {
    path: routes.articles,
  });

fetchItemsTestSuite('<Articles />', {
  render: () => renderArticles(),
  variant: 'articles',
});
