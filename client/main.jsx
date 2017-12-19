import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes';
import { Accounts } from 'meteor/accounts-base';

import '../imports/startup/accounts-config.js';

//import App from '../imports/ui/App.jsx';

// if (Meteor.isClient) {
//     Accounts.onEmailVerificationLink(function(token, done) {
//       console.log('Accounts.onEmailVerificationLink');
//     });
// }

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false  
})

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
