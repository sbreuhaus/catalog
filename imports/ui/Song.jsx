import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
// Task component - represents a single todo item
export default class Song extends Component {

  render() {
    return (
      <div>
        <li><p>{this.props.song}</p></li>
          <ReactAudioPlayer
            src="my_audio_file.ogg"
            autoPlay
            controls
            />
      </div>
    );
  }
}

Song.propTypes = {
  // This component gets the song to display through a React prop.
  // We can use propTypes to indicate it is required
  song: PropTypes.string.isRequired,
};
