import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

//Meteor account wrapper
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Template } from 'meteor/templating';

//API
import { Songs } from '../api/songs.js';

class SongUpload extends Component {
    constructor(props){
      super(props)
    }

    componentDidMount() {

    }

    handleSubmit(e){
      e.preventDefault();
      console.log("new song submitted");
      const songName = ReactDOM.findDOMNode(this.refs.songName).value.trim();
      const genre = ReactDOM.findDOMNode(this.refs.genre).value.trim();

      console.log("songName", songName);
      console.log("genre", genre);

      Meteor.call('songs.insert', {songName, genre});

      console.log(this.refs.songName.value);
      ReactDOM.findDOMNode(this.refs.songName).value = '';
      ReactDOM.findDOMNode(this.refs.genre).value = '';
    }

    handleCVSUpload(e) {

    }

    render() {
      return (
        <div className="container-fluid">
          <h1>Man Made Music upload form</h1>
          <AccountsUIWrapper />
            { this.props.currentUser ?
              <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                <input
                  type="text"
                  ref="songName"
                  placeholder="Song Title"
                />
                <input
                  type="text"
                  ref="genre"
                  placeholder="genre"
                />
              <button>Submit</button>
              <form name="upload">
                <h4>Upload a CSV</h4>
                <input type="file" ref="uploadCSV"></input>
              </form>

              </form> : ''
            }
        </div>
      )
    }
}

SongUpload.propTypes = {
  currentUser: PropTypes.object
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  }
}, SongUpload)
