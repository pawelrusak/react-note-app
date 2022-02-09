import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Articles from './Articles/Articles';
import DetailsPage from './DetailsPage/DetailsPage';
import LoginPage from './LoginPage/LoginPage';
import Notes from './Notes/Notes';
import RegisterPage from './RegisterPage/RegisterPage';
import Twitters from './Twitters/Twitters';
import { ROUTES_PATHS } from '~/constants';
import store from '~/store';
import MainTemplate from '~/templates/MainTemplate/MainTemplate';
import { PrivateRoute } from '~/utils/components';

const Root = () => (
  <>
    <Helmet titleTemplate="%s - FavNote." />

    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={ROUTES_PATHS.login} component={LoginPage} />
            <Route exact path={ROUTES_PATHS.register} component={RegisterPage} />
            <PrivateRoute exact path={ROUTES_PATHS.home} render={() => <Redirect to="/notes" />} />
            <PrivateRoute exact path={ROUTES_PATHS.notes} component={Notes} />
            <PrivateRoute path={ROUTES_PATHS.note} component={DetailsPage} />
            <PrivateRoute exact path={ROUTES_PATHS.articles} component={Articles} />
            <PrivateRoute path={ROUTES_PATHS.article} component={DetailsPage} />
            <PrivateRoute exact path={ROUTES_PATHS.twitters} component={Twitters} />
            <PrivateRoute path={ROUTES_PATHS.twitter} component={DetailsPage} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  </>
);

export default Root;
