import { render, userEvent, screen, waitFor } from 'testUtils';
import { fakeStateWithDataAndLoggedInUser } from 'testUtils/fakers';

import Sidebar from '../Sidebar/Sidebar';

jest.mock('~/services');

describe('<Sidebar />', () => {
  it('sets the "userID" in the auth state to null when the logout button is clicked', async () => {
    const { store } = render(<Sidebar />, { initialState: fakeStateWithDataAndLoggedInUser });

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /logout/i })));

    expect(store.getState().auth.userID).toBeNull();
  });
});
