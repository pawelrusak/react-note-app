import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { render, screen, waitFor, userEvent } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import LoginPage from '../LoginPage/LoginPage';
import * as actions from '~/actions/auth';
import rootReducer from '~/reducers';
import { routes } from '~/routes';

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByLoginButton = () => screen.getByRole('button');
const queryByFakeHomePage = () => screen.queryByTestId('fake-home-Page');

const fakeLoginData = {
  username: 'app@login.test',
  password: 'password', // the best password in the world
};

const mocksAuthenticate = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return jest.spyOn(actions, 'authenticate').mockImplementation(() => ({
    type: 'AUTH_SUCCESS',
    payload: {
      user: {
        uid: 'testUid',
      },
    },
  }));
};

const FakeHomePage = () => <div data-testid="fake-home-Page">Home Page</div>;

const renderLoginPage = () =>
  render(
    <Switch>
      <Route exact path={routes.login} component={LoginPage} />
      <Route exact path={routes.home} component={FakeHomePage} />
    </Switch>,
    {
      store: createStore(rootReducer, fakeStateWithNotLoggedInUser),
      path: routes.login,
    },
  );

describe('<LoginPage />', () => {
  it('submits correct values to authentication and redirect to the home page', async () => {
    const mockAuthenticate = mocksAuthenticate();

    renderLoginPage();

    expect(queryByFakeHomePage()).not.toBeInTheDocument();

    userEvent.type(getByLoginPlaceholderText(), fakeLoginData.username);
    userEvent.type(getByPasswordPlaceholderText(), fakeLoginData.password);

    // submit form
    await waitFor(() => userEvent.click(getByLoginButton()));

    // submits correct values to authentication
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(fakeLoginData.username, fakeLoginData.password);

    // redirect to the home page
    await waitFor(() => expect(queryByFakeHomePage()).toBeInTheDocument());
  });
});
