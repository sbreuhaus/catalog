import { Meteor } from 'meteor/meteor';
import '../imports/api/songs.js';
import { Accounts } from 'meteor/accounts-base'
import { Email } from 'meteor/email';

// process.env.MAIL_URL = 'smtp://postmaster%40sandbox646f003772b94798bc0e5f15fa6dea7b.mailgun.org:b3a128b9181f75a4e9ad18d8bc06ed17@smtp.mailgun.org:587';

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
  Accounts.emailTemplates.from = 'Man Made Music <tech@manmademusic.com>';
  Accounts.emailTemplates.subject = 'Click the link to access the AT&T Micrcatalog';
  process.env.MAIL_URL = 'smtp://postmaster@manmademusic.com:82006a561bcb92b64d75965f8161bce8@smtp.mailgun.org:587';
  
});


Meteor.methods({
  sendEmail() {
    let userId = Meteor.userId();
    let email = Meteor.user().emails[0].address;
    console.log('Meteor.user().emails[0].address', Meteor.user().emails[0].address);
    if(userId){
      console.log("send Email Method");
      console.log('user id', userId);
      return Accounts.sendVerificationEmail(userId, email);
    }

  }
})
