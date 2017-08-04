import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';

import '../ui/SongUpload.jsx';

export const Songs = new Mongo.Collection('songs');

Meteor.methods({
  'songs.insert'({songName, genre}){
    check(songName, String);

    if(! Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    console.log('INSERTING');
    Songs.insert({
      songName,
      genre,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
})
