import { Switch } from 'react-router-dom';
import { render } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import PrivateRoute from '../components/PrivateRoute';
import { ROUTES_PATHS } from '~/constants';
import Notes from '~/views/Notes/Notes';

describe('<PrivateRoute />', () => {
  afterEach(() => {
    // clean URL path
    window.history.pushState({}, 'Test page', '/');
  });

  it('redirect to "/login" URL path when auth state does not have user logged in', () => {
    expect(window.location.pathname).toBe('/');

    render(
      <Switch>
        <PrivateRoute path={ROUTES_PATHS.notes} component={Notes} />
      </Switch>,
      {
        path: ROUTES_PATHS.notes,
        initialState: fakeStateWithNotLoggedInUser,
      },
    );

    expect(window.location.pathname).toBe(ROUTES_PATHS.login);
  });
});
