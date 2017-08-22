import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = (props) => {
  let { songUrl, selectedUrl, searchMatches } = props;

  const URL = `http://www.manmademusic.com/files/att_microcatalog/resources/${songUrl}.mp3`;

  return (
    <div className="music-player" style={ searchMatches ? { marginBottom: '10vh' } : { marginBottom: '0px' } }>
      <ReactAudioPlayer
        className="col-md-6 col-sm-12 col-xs-12"
        preload="none"
        src={URL}
        controls
        />
      <span className="player-song col-md-6 ">Current song: {props.selectedUrl}</span>
    </div>
  )
}

export default MusicPlayer;
