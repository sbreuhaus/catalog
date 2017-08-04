import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

import App from '../../ui/App';
import SongUpload from '../../ui/SongUpload';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/mmm" component={SongUpload}/>
    </div>
  </Router>
);
