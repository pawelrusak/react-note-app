import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Articles from './Articles/Articles';
import DetailsPage from './DetailsPage/DetailsPage';
import LoginPage from './LoginPage/LoginPage';
import Notes from './Notes/Notes';
import RegisterPage from './RegisterPage/RegisterPage';
import Twitters from './Twitters/Twitters';
import { routes } from '~/routes';
import store from '~/store';
import MainTemplate from '~/templates/MainTemplate/MainTemplate';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route exact path={routes.home} render={() => <Redirect to="/notes" />} />
          <Route exact path={routes.notes} component={Notes} />
          <Route path={routes.note} component={DetailsPage} />
          <Route exact path={routes.articles} component={Articles} />
          <Route path={routes.article} component={DetailsPage} />
          <Route exact path={routes.twitters} component={Twitters} />
          <Route path={routes.twitter} component={DetailsPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
