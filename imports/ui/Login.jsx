import React, { Component } from 'react';
// import { Accounts } from 'meteor/std:accounts-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
  onSubmit(e) {
    e.preventDefault()
    let email = 'sbreuhaus+48@gmail.com';
    let password = '1234';
    // alert("test");
    // Accounts
    // console.log("accounts", Accounts);

    //var x = Meteor.methods(cheese());
     // Meteor.methods(cheese);
     // Meteor.call("cheese", function(e,s){
     //   console.log("error: result", e, s);
     //   debugger;
     // });

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        console.log("err", err);
        alert(err);
      } else {
        console.log("no error but this is err object", err);
        // Accounts.sendVerificationEmail(Meteor.userId());
        Meteor.call('sendEmail');
      }
    });
  }

  render(){
    return (
      <div className="container" >
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit.bind(this)} noValidate>
              <input ref={input => this.email = input} type="email" name="email" placeholder="Email"/>
              <input ref={input => this.password = input} type="password" name="password" placeholder="Password"/>
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}
// <h1 onClick={this.onSubmit.bind(this)} >  click this </h1>

// <Accounts.ui.LoginForm onSignedInHook={ () => console.log('user signed in')}/>
