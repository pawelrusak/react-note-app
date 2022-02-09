import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Notes from '../Notes/Notes';
import { ROUTES_PATHS } from '~/constants';

jest.mock('~/services');

const renderNotes = () =>
  render(<Notes />, {
    path: ROUTES_PATHS.notes,
  });

fetchItemsTestSuite('<Notes />', {
  render: () => renderNotes(),
  variant: 'notes',
});
