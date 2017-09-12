import { Accounts } from 'meteor/std:accounts-bootstrap';


Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: true
});

Accounts.ui.config({

  loginPath: '/login',
  homeRoutePath: '/',
});


// emailPattern: new RegExp(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)
