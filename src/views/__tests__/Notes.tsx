import { render } from 'testUtils';
import { fetchItemsTestSuite } from 'testUtils/sharedTests';

import Notes from '../Notes/Notes';
import { routes } from '~/routes';

jest.mock('~/services');

const renderNotes = () =>
  render(<Notes />, {
    path: routes.notes,
    pageType: 'notes',
  });

fetchItemsTestSuite('<Notes />', {
  render: () => renderNotes(),
  variant: 'notes',
});
