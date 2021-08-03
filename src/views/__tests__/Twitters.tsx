import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Twitters from '../Twitters/Twitters';
import { routes } from '~/routes';

jest.mock('~/services');

const renderTwitters = () =>
  render(<Twitters />, {
    path: routes.twitters,
    pageType: 'twitters',
  });

fetchItemsTestSuite('<Twitters />', {
  render: () => renderTwitters(),
  variant: 'twitters',
});
