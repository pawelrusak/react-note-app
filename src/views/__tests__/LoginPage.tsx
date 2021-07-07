import { Route, Switch } from 'react-router-dom';
import { render, screen, waitFor, userEvent } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import LoginPage from '../LoginPage/LoginPage';
import { routes } from '~/routes';
import * as actions from '~/store/auth/authSlice';

jest.mock('~/services');

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByLoginButton = () => screen.getByRole('button');
const queryByFakeHomePage = () => screen.queryByTestId('fake-home-Page');

const fakeLoginData = {
  email: 'app@login.test',
  password: 'password', // the best password in the world
};

const FakeHomePage = () => <div data-testid="fake-home-Page">Home Page</div>;

const renderLoginPage = () =>
  render(
    <Switch>
      <Route exact path={routes.login} component={LoginPage} />
      <Route exact path={routes.home} component={FakeHomePage} />
    </Switch>,
    {
      initialState: fakeStateWithNotLoggedInUser,
      path: routes.login,
    },
  );

describe('<LoginPage />', () => {
  it('submits correct values to authentication and redirect to the home page', async () => {
    const mockAuthenticate = jest.spyOn(actions, 'authenticate');

    renderLoginPage();

    expect(queryByFakeHomePage()).not.toBeInTheDocument();

    userEvent.type(getByLoginPlaceholderText(), fakeLoginData.email);
    userEvent.type(getByPasswordPlaceholderText(), fakeLoginData.password);

    // submit form
    await waitFor(() => userEvent.click(getByLoginButton()));

    // submits correct values to authentication
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(fakeLoginData);

    // redirect to the home page
    await waitFor(() => expect(queryByFakeHomePage()).toBeInTheDocument());
  });

  it('initially, the form should not contain any errors and button should be enable', () => {
    renderLoginPage();

    expect(getByLoginButton()).toBeEnabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('disable the button after submitting an invalid form and enable it after fixing all form errors', async () => {
    renderLoginPage();

    // attempt to submit an invalid form
    await waitFor(() => userEvent.click(getByLoginButton()));

    // the submit button should now be disabled and the form fields should be invalid
    expect(getByLoginButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByLoginPlaceholderText(), 'correct@example.email');

    // the submit button should not be enable yet, it is waiting for all form fields to be valid
    await waitFor(() => expect(getByLoginButton()).toBeDisabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByPasswordPlaceholderText(), 'correct-password');

    // when all form fields are valid then enable the submit button
    await waitFor(() => expect(getByLoginButton()).toBeEnabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });
});
