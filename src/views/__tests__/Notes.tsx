import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Notes from '../Notes/Notes';
import { routes } from '~/constants';

jest.mock('~/services');

const renderNotes = () =>
  render(<Notes />, {
    path: routes.notes,
  });

fetchItemsTestSuite('<Notes />', {
  render: () => renderNotes(),
  variant: 'notes',
});
