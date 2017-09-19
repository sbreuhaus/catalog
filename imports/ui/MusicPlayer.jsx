import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactSVG from 'react-svg';

class MusicPlayer extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    const URL = `http://www.manmademusic.com/files/att_microcatalog/resources/${songUrl}.mp3`;
    let { songUrl, selectedUrl, searchMatches } = this.props;

    return (
      <div className="audio-player-container col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div className="player-logo">
          <ReactSVG
            path="../../ATT.svg"
            className="example"
            style={{ width: 32 }}
            />
        </div>
        <div className="player">
          <div id="songTitle" className="song-title">{selectedUrl}</div>
          <input id="songSlider" className="song-slider" type="range" min="0" step="1"></input>
          <audio className="att_player" ref="att_player"></audio>
        </div>
      </div>
    )
  }
}

export default MusicPlayer;
