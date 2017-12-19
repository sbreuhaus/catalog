// export process.env.MAIL_URL = 'smtps://postmaster%40sandbox646f003772b94798bc0e5f15fa6dea7b.mailgun.org:b3a128b9181f75a4e9ad18d8bc06ed17@smtp.mailgun.org:587';

import {Meteor} from 'meteor/meteor';

Meteor.startup({
  process.env.MAIL_URL = Meteor.settings.Mailgun
})
