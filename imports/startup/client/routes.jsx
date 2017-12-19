import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from '../../ui/App';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;
import Login from '../../ui/Login';

const unAuthenticatedPage = ['/login', '/signup']

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/login" component={Login}/>
    </Switch>
  </Router>
);
