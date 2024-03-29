import { build, fake } from '@jackfranklin/test-data-bot';
import { Route, Switch } from 'react-router-dom';
import { render, screen, waitFor, userEvent } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import RegisterPage from '../RegisterPage/RegisterPage';
import {
  REGISTERED_USER_CREDENTIALS,
  AUTH_ERRORS,
  SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD,
  ROUTES_PATHS,
} from '~/constants';

import type { AuthCredential } from '~/commonTypes';

jest.mock('~/services');

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByRegisterButton = () => screen.getByRole('button', { name: /register/i });
const queryFakeHomePage = () => screen.queryByTestId('FakeHomePage');

const FakeHomePage = () => <div data-testid="FakeHomePage">Home Page</div>;

const renderRegisterPage = () =>
  render(
    <Switch>
      <Route exact path={ROUTES_PATHS.register} component={RegisterPage} />
      <Route exact path={ROUTES_PATHS.home} component={FakeHomePage} />
    </Switch>,
    {
      initialState: fakeStateWithNotLoggedInUser,
      path: ROUTES_PATHS.register,
    },
  );

const authCredentialsBuilder = build<AuthCredential>({
  fields: {
    email: fake((faker) => faker.internet.email()),
    password: fake((faker) => faker.internet.password()),
  },
});

describe('<RegisterPage />', () => {
  it('display correct document title ', async () => {
    renderRegisterPage();

    await waitFor(() => expect(document.title).toBe('Register'));
  });

  it('initially, the form should not contain any errors and button should be enable', () => {
    renderRegisterPage();

    expect(getByRegisterButton()).toBeEnabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('disable the button after submitting an invalid form and enable it after fixing all form errors', async () => {
    const authCredentialsOfUnregisteredUser = authCredentialsBuilder();

    renderRegisterPage();

    // attempt to submit an invalid form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    // the submit button should now be disabled and the form fields should be invalid
    expect(getByRegisterButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByLoginPlaceholderText(), authCredentialsOfUnregisteredUser.email);

    // the submit button should not be enable yet, it is waiting for all form fields to be valid
    await waitFor(() => expect(getByRegisterButton()).toBeDisabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByPasswordPlaceholderText(), authCredentialsOfUnregisteredUser.password);

    // when all form fields are valid then enable the submit button
    await waitFor(() => expect(getByRegisterButton()).toBeEnabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('the email field should be invalid and have an error message from the server when a registered user tries to log in', async () => {
    renderRegisterPage();

    userEvent.type(getByLoginPlaceholderText(), REGISTERED_USER_CREDENTIALS.EMAIL);
    userEvent.type(getByPasswordPlaceholderText(), REGISTERED_USER_CREDENTIALS.PASSWORD);

    // // submit form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    expect(getByRegisterButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeInvalid();
    expect(getByLoginPlaceholderText()).toHaveErrorMessage(
      AUTH_ERRORS.EMAIL_ALREADY_IN_USE.message,
    );
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('the password field should be invalid and have a server error message after the user tries to register with a weak password', async () => {
    const unregisteredUserCredentialsWithWeakPassword = authCredentialsBuilder({
      overrides: {
        password: SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD,
      },
    });

    renderRegisterPage();

    userEvent.type(getByLoginPlaceholderText(), unregisteredUserCredentialsWithWeakPassword.email);
    userEvent.type(
      getByPasswordPlaceholderText(),
      unregisteredUserCredentialsWithWeakPassword.password,
    );

    // submit form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    expect(getByRegisterButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toHaveErrorMessage(AUTH_ERRORS.WEAK_PASSWORD.message);
  });

  it('submits correct values to registration and redirect to the home page', async () => {
    const unregisteredUserCredentials = authCredentialsBuilder();

    renderRegisterPage();

    expect(queryFakeHomePage()).not.toBeInTheDocument();

    userEvent.type(getByLoginPlaceholderText(), unregisteredUserCredentials.email);
    userEvent.type(getByPasswordPlaceholderText(), unregisteredUserCredentials.password);

    // submit form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    // redirect to the home page
    await waitFor(() => expect(queryFakeHomePage()).toBeInTheDocument());
  });
});
