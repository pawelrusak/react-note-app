import { build, fake } from '@jackfranklin/test-data-bot';
import { Route, Switch } from 'react-router-dom';
import { render, screen, waitFor, userEvent } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import LoginPage from '../LoginPage/LoginPage';
import { REGISTERED_USER_CREDENTIALS, AUTH_ERRORS } from '~/constants/tests';
import { routes } from '~/routes';

import type { AuthCredentials } from '~/commonTypes';

jest.mock('~/services');

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByLoginButton = () => screen.getByRole('button');
const queryFakeHomePage = () => screen.queryByTestId('FakeHomePage');

const FakeHomePage = () => <div data-testid="FakeHomePage">Home Page</div>;

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

const authCredentialsBuilder = build<AuthCredentials>({
  fields: {
    email: fake((faker) => faker.internet.email()),
    password: fake((faker) => faker.internet.password()),
  },
});

describe('<LoginPage />', () => {
  test('display correct document title ', async () => {
    renderLoginPage();

    await waitFor(() => expect(document.title).toBe('Login'));
  });

  it('initially, the form should not contain any errors and button should be enable', () => {
    renderLoginPage();

    expect(getByLoginButton()).toBeEnabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('disable the button after submitting an invalid form and enable it after fixing all form errors', async () => {
    const authCredentials = authCredentialsBuilder();

    renderLoginPage();

    // attempt to submit an invalid form
    await waitFor(() => userEvent.click(getByLoginButton()));

    // the submit button should now be disabled and the form fields should be invalid
    expect(getByLoginButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByLoginPlaceholderText(), authCredentials.email);

    // the submit button should not be enable yet, it is waiting for all form fields to be valid
    await waitFor(() => expect(getByLoginButton()).toBeDisabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByPasswordPlaceholderText(), authCredentials.password);

    // when all form fields are valid then enable the submit button
    await waitFor(() => expect(getByLoginButton()).toBeEnabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('the email field should be invalid and have an error message from the server when a unregistered user tries to log in', async () => {
    const authCredentialsOfUnregisteredUser = authCredentialsBuilder();

    renderLoginPage();

    userEvent.type(getByLoginPlaceholderText(), authCredentialsOfUnregisteredUser.email);
    userEvent.type(getByPasswordPlaceholderText(), authCredentialsOfUnregisteredUser.password);

    // submit form
    await waitFor(() => userEvent.click(getByLoginButton()));

    expect(getByLoginButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeInvalid();
    expect(getByLoginPlaceholderText()).toHaveErrorMessage(AUTH_ERRORS.USER_NOT_FOUND.message);
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('the password field should be invalid and have a server error message after a registered user tries to log in with an incorrect password', async () => {
    const registeredUserCredentialsWithWrongPassword = authCredentialsBuilder({
      overrides: {
        email: REGISTERED_USER_CREDENTIALS.EMAIL,
      },
    });

    renderLoginPage();

    userEvent.type(getByLoginPlaceholderText(), registeredUserCredentialsWithWrongPassword.email);
    userEvent.type(
      getByPasswordPlaceholderText(),
      registeredUserCredentialsWithWrongPassword.password,
    );

    // submit form
    await waitFor(() => userEvent.click(getByLoginButton()));

    expect(getByLoginButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toHaveErrorMessage(AUTH_ERRORS.WRONG_PASSWORD.message);
  });

  it('submits correct values to authentication and redirect to the home page', async () => {
    renderLoginPage();

    expect(queryFakeHomePage()).not.toBeInTheDocument();

    userEvent.type(getByLoginPlaceholderText(), REGISTERED_USER_CREDENTIALS.EMAIL);
    userEvent.type(getByPasswordPlaceholderText(), REGISTERED_USER_CREDENTIALS.PASSWORD);

    // submit form
    await waitFor(() => userEvent.click(getByLoginButton()));

    // redirect to the home page
    await waitFor(() => expect(queryFakeHomePage()).toBeInTheDocument());
  });
});
