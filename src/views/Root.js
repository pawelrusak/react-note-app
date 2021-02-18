import MainTemplate from 'templates/MainTemplate';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Notes from 'views/Notes';
import Articles from 'views/Articles';

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/notes" />} />
        <Route path="/notes" component={Notes} />
        <Route path="/articles" component={Articles} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
