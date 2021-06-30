import { Route, Switch } from 'react-router-dom';
import { render, screen, waitFor, userEvent } from 'testUtils';
import { fakeStateWithNotLoggedInUser } from 'testUtils/fakers';

import RegisterPage from '../RegisterPage/RegisterPage';
import { routes } from '~/routes';
import * as actions from '~/store/auth/authSlice';

jest.mock('~/services');

const getByLoginPlaceholderText = () => screen.getByPlaceholderText(/login/i);
const getByPasswordPlaceholderText = () => screen.getByPlaceholderText(/password/i);
const getByRegisterButton = () => screen.getByRole('button', { name: /register/i });
const queryByFakeHomePage = () => screen.queryByTestId('fake-home-Page');

const fakeRegistrationData = {
  email: 'app@login.test',
  password: 'password', // the best password in the world
};

const FakeHomePage = () => <div data-testid="fake-home-Page">Home Page</div>;

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
  it('submits correct values to registration and redirect to the home page', async () => {
    // eslint-disable-next-line
    // @ts-expect-error
    const mockAuthenticate = jest.spyOn(actions, 'register');

    renderRegisterPage();

    expect(queryByFakeHomePage()).not.toBeInTheDocument();

    userEvent.type(getByLoginPlaceholderText(), fakeRegistrationData.email);
    userEvent.type(getByPasswordPlaceholderText(), fakeRegistrationData.password);

    // submit form
    await waitFor(() => userEvent.click(getByRegisterButton()));

    // submits correct values to registration
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith(fakeRegistrationData);

    // redirect to the home page
    await waitFor(() => expect(queryByFakeHomePage()).toBeInTheDocument());
  });
});
