import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

import App from '../../ui/App';
import Login from '../../ui/Login';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </Router>
);


// <Route path="/login" component={Login}/>
