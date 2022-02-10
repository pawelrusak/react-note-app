import { render, userEvent, screen, waitFor } from 'testUtils';
import { fakeStateWithDataAndLoggedInUser } from 'testUtils/fakers';

import Navbar from '../Navbar/Navbar';
import { ROUTES_PATHS } from '~/constants';

jest.mock('~/services');

describe('<Navbar />', () => {
  it('sets the "userID" in the auth state to null when the logout button is clicked', async () => {
    const { store } = render(<Navbar />, {
      initialState: fakeStateWithDataAndLoggedInUser,
      path: ROUTES_PATHS.notes,
    });

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /logout/i })));

    expect(store.getState().auth.userID).toBeNull();
  });
});
