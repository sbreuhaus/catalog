import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactSVG from 'react-svg';

class MusicPlayer extends React.Component {

  componentWillUnmount(){
    console.log("NusicPlayer UnMounted");
  }

  render() {
    const URL = `http://www.manmademusic.com/files/att_microcatalog/resources/${songUrl}.mp3`;
    let { songUrl, selectedUrl, searchMatches } = this.props;

    return (
      <div className="audio-player-container col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div className="player">
          <div id="currentTime" className="current-time">00:00</div>
          <input id="songSlider" className="song-slider" type="range" min="0" step="1" value="0" onChange={this.props.seekSong}></input>
          <div id="duration" className="duration">00:00</div>
          <audio className="att_player" ref="att_player" preload="true"></audio>
        </div>
      </div>
    )
  }
}

export default MusicPlayer;
