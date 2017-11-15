import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  console.log('is server');
  // This code only runs on the server
  Meteor.publish('songs', () => {
    return Songs.find();
  });
}

// Songs.schema = new SimpleSchema({
//   name: {type: String},
//   playlist: {type: String},
//   description: {type: String},
//   genre: {type: String},
//   notable_instr: {type: String},
//   potential_uses: {type: String},
//   other_tags: {type: String},
//   sponsorship: {type: String},
//   url: {type: String}
// })

// Meteor.methods({
//   'songs.insert'({songName, genre}){
//     check(songName, String);
//
//     if(! Meteor.userId()){
//       throw new Meteor.Error('not-authorized');
//     }
//     console.log('INSERTING');
//     Songs.insert({
//       songName,
//       genre,
//       createdAt: new Date(),
//       owner: Meteor.userId(),
//       username: Meteor.user().username,
//     });
//   },
// })
