import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactSVG from 'react-svg';

class MusicPlayer extends React.Component {

  componentWillUnmount() {
    console.log("NusicPlayer UnMounted");
  }

  render() {
    let { songUrl, selectedUrl, searchMatches, playAudioNav, pauseAudioNav } = this.props;
    function showPlayPause() {
      console.log('showPlayPause');
      if (true) {
        return (
          <div className="play-pause">
            <span className="fa fa-play fa-lg nav-play" type="button" onClick={playAudioNav} />
            <span className="fa fa-pause fa-lg nav-pause" type="button" onClick={pauseAudioNav} />
          </div>
        )
      }
    }

    return (
      <div className="audio-player-container col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div className="player">
          { showPlayPause() }
          <div id="currentTime" className="current-time">00:00</div>
          <input
            id="songSlider"
            className="song-slider"
            type="range"
            min="0"
            step="1"
            value="0"
            onChange={this.props.seekSong}
          />
          <div id="duration" className="duration">00:00</div>
          <audio className="att_player" ref="att_player" preload="true" />
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
