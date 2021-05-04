import { render, screen, waitFor, userEvent } from 'testUtils';
import * as actions from 'actions';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'routes';
import LoginPage from '../LoginPage/LoginPage';

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByLoginButton = () => screen.getByRole('button');
const queryByFakeHomePage = () => screen.queryByTestId('fake-home-Page');

const fakeLoginData = {
  username: 'app@login.test',
  password: 'password', // the best password in the world
};

const fakeNoLoginState = {
  userID: null,
};

const mocksAuthenticate = () =>
  jest.spyOn(actions, 'authenticate').mockImplementation(() => ({
    type: 'AUTH_SUCCESS',
    payload: {
      user: {
        uid: 'testUid',
      },
    },
  }));

const FakeHomePage = () => <div data-testid="fake-home-Page">Home Page</div>;

const renderLoginPage = () =>
  render(
    <Switch>
      <Route exact path={routes.login} component={LoginPage} />
      <Route exact path={routes.home} component={FakeHomePage} />
    </Switch>,
    {
      store: createStore(rootReducer, fakeNoLoginState),
      path: routes.login,
    },
  );

describe('<LoginPage />', () => {
  it('submits correct values to authentication and redirect to the home page', async () => {
    const mockAuthenticate = mocksAuthenticate();

    renderLoginPage();

    expect(queryByFakeHomePage()).not.toBeInTheDocument();

    await waitFor(() => userEvent.type(getByLoginPlaceholderText(), fakeLoginData.username));
    await waitFor(() => userEvent.type(getByPasswordPlaceholderText(), fakeLoginData.password));

    // submit form
    await waitFor(() => userEvent.click(getByLoginButton()));

    // submits correct values to authentication
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(fakeLoginData.username, fakeLoginData.password);

    // redirect to the home page
    await waitFor(() => expect(queryByFakeHomePage()).toBeInTheDocument());
  });
});