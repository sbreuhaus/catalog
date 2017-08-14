import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = (props) => {
  let songUrl = props.songUrl
  let selectedUrl = props.selectedUrl;

  //console.log("new URL", songUrl);
  const URL = `http://www.manmademusic.com/files/att_microcatalog/resources/${songUrl}.mp3`
  //console.log("Here's the URL", URL);
  return (
    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 music-player">
      <div className="text-justify">{props.selectedUrl}</div>
      <ReactAudioPlayer
        src={URL}
        controls
        />
    </div>
  )
}

export default MusicPlayer;
