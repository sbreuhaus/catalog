import { Template } from 'meteor/templating';


Template.upload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});
