import React, { Component } from 'react';
import { Accounts } from 'meteor/std:accounts-bootstrap';

export default class Login extends Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Accounts.ui.LoginForm onSignedInHook={ () => console.log('user signed in')}/>
          </div>
        </div>
      </div>

    )
  }
}
