import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Articles from './Articles/Articles';
import DetailsPage from './DetailsPage/DetailsPage';
import LoginPage from './LoginPage/LoginPage';
import Notes from './Notes/Notes';
import RegisterPage from './RegisterPage/RegisterPage';
import Twitters from './Twitters/Twitters';
import { routes } from '~/constants';
import PrivateRoute from '~/routes/PrivateRoute';
import store from '~/store';
import MainTemplate from '~/templates/MainTemplate/MainTemplate';

const Root = () => (
  <>
    <Helmet titleTemplate="%s - FavNote." />

    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.login} component={LoginPage} />
            <Route exact path={routes.register} component={RegisterPage} />
            <PrivateRoute exact path={routes.home} render={() => <Redirect to="/notes" />} />
            <PrivateRoute exact path={routes.notes} component={Notes} />
            <PrivateRoute path={routes.note} component={DetailsPage} />
            <PrivateRoute exact path={routes.articles} component={Articles} />
            <PrivateRoute path={routes.article} component={DetailsPage} />
            <PrivateRoute exact path={routes.twitters} component={Twitters} />
            <PrivateRoute path={routes.twitter} component={DetailsPage} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  </>
);

export default Root;
