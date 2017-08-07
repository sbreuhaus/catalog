import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = (props) => {
  return (
    <div className="col-md-1">
      <ReactAudioPlayer
        src="http://www.manmademusic.com/files/att_microcatalog/resources/Vamonos.mp3"
        controls
        />
    </div>
  )
}

export default MusicPlayer;
