import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
// Task component - represents a single todo item
const Song = (props) => {
    return (
      <ul className="list-group">
        <li className="list-group-item" onClick={props.clickSong}>{props.song.name}</li>
      </ul>
    );
}

export default Song;

Song.propTypes = {
  // This component gets the song to display through a React prop.
  // We can use propTypes to indicate it is required
  song: PropTypes.object
};
