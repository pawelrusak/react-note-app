import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Twitters from '../Twitters/Twitters';
import { ROUTES_PATHS } from '~/constants';

jest.mock('~/services');

const renderTwitters = () =>
  render(<Twitters />, {
    path: ROUTES_PATHS.twitters,
  });

fetchItemsTestSuite('<Twitters />', {
  render: () => renderTwitters(),
  variant: 'twitters',
});
