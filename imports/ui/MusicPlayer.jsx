import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = (props) => {
  let songUrl = props.songUrl
  let selectedUrl = props.selectedUrl;

  const URL = `http://www.manmademusic.com/files/att_microcatalog/resources/${songUrl}.mp3`;

  return (
    <div className="music-player">
      <span className="player-song col-md-2 ">{props.selectedUrl}</span>
      <ReactAudioPlayer
        className="col-md-6 col-sm-12 col-xs-12"
        src={URL}
        controls
        />
    </div>
  )
}

export default MusicPlayer;
