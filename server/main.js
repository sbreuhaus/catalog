import { Meteor } from 'meteor/meteor';
import '../imports/api/songs.js';
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email';
// require('https').globalAgent.options.secureProtocol = 'TLSv1_method';

process.env.MAIL_URL = 'smtp://postmaster%40sandbox646f003772b94798bc0e5f15fa6dea7b.mailgun.org:b3a128b9181f75a4e9ad18d8bc06ed17@smtp.mailgun.org:587';

import '../imports/startup/accounts-config.js';
// verification for account creation
import '../imports/api/users';
Meteor.startup(() => {
  // code to run on server at startup
  // Accounts.config({
  //   sendVerificationEmail: true,
  // });
  // process.env.MAIL_URL = 'smtps://postmaster%40sandbox646f003772b94798bc0e5f15fa6dea7b.mailgun.org:b3a128b9181f75a4e9ad18d8bc06ed17@smtp.mailgun.org:587';
  //console.log('is the mail here', process.env);

});


Meteor.methods({
  sendEmail() {
    // return Meteor.userId();
    let userId = Meteor.userId();
    let email = Meteor.user().emails[0].address;
    console.log('Meteor.user().emails[0].address', Meteor.user().emails[0].address);
    if(userId){
      console.log("send Email Method");
      console.log('user id', userId);
      return Accounts.sendVerificationEmail(userId, email);
    }
    // this.unblock();
    // Email.send({
    //   to,
    //   from,
    //   subject,
    //   text
    // });
  }
})
