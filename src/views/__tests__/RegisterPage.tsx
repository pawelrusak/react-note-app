import { Route, Switch } from 'react-router-dom';
import { render, screen, waitFor, userEvent } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import RegisterPage from '../RegisterPage/RegisterPage';
import {
  REGISTERED_USER_CREDENTIALS,
  AUTH_ERRORS,
  SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD,
} from '~/constants/tests';
import { routes } from '~/routes';

jest.mock('~/services');

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByRegisterButton = () => screen.getByRole('button', { name: /register/i });
const queryByFakeHomePage = () => screen.queryByTestId('FakeHomePage');

const fakeRegistrationData = {
  email: 'app@login.test',
  password: 'password', // the best password in the world
};

const FakeHomePage = () => <div data-testid="FakeHomePage">Home Page</div>;

const renderRegisterPage = () =>
  render(
    <Switch>
      <Route exact path={routes.register} component={RegisterPage} />
      <Route exact path={routes.home} component={FakeHomePage} />
    </Switch>,
    {
      initialState: fakeStateWithNotLoggedInUser,
      path: routes.register,
    },
  );

describe('<RegisterPage />', () => {
  it('initially, the form should not contain any errors and button should be enable', () => {
    renderRegisterPage();

    expect(getByRegisterButton()).toBeEnabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('disable the button after submitting an invalid form and enable it after fixing all form errors', async () => {
    renderRegisterPage();

    // attempt to submit an invalid form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    // the submit button should now be disabled and the form fields should be invalid
    expect(getByRegisterButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByLoginPlaceholderText(), 'correct@example.email');

    // the submit button should not be enable yet, it is waiting for all form fields to be valid
    await waitFor(() => expect(getByRegisterButton()).toBeDisabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();

    userEvent.type(getByPasswordPlaceholderText(), 'correct-password');

    // when all form fields are valid then enable the submit button
    await waitFor(() => expect(getByRegisterButton()).toBeEnabled());

    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeValid();
  });

  it('the email field should be invalid and have an error message from the server when a registered user tries to log in', async () => {
    renderRegisterPage();

    userEvent.type(getByLoginPlaceholderText(), REGISTERED_USER_CREDENTIALS.email);
    userEvent.type(getByPasswordPlaceholderText(), REGISTERED_USER_CREDENTIALS.password);

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
    renderRegisterPage();

    userEvent.type(getByLoginPlaceholderText(), 'example@password.test');
    userEvent.type(getByPasswordPlaceholderText(), SPECIAL_VALUE_TO_TEST_WEAK_PASSWORD);

    // submit form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    expect(getByRegisterButton()).toBeDisabled();
    expect(getByLoginPlaceholderText()).toBeValid();
    expect(getByPasswordPlaceholderText()).toBeInvalid();
    expect(getByPasswordPlaceholderText()).toHaveErrorMessage(AUTH_ERRORS.WEAK_PASSWORD.message);
  });

  it('submits correct values to registration and redirect to the home page', async () => {
    renderRegisterPage();

    expect(queryByFakeHomePage()).not.toBeInTheDocument();

    userEvent.type(getByLoginPlaceholderText(), fakeRegistrationData.email);
    userEvent.type(getByPasswordPlaceholderText(), fakeRegistrationData.password);

    // submit form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    // redirect to the home page
    await waitFor(() => expect(queryByFakeHomePage()).toBeInTheDocument());
  });
});
