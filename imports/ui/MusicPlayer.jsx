import React from 'react';

class MusicPlayer extends React.Component {

  render() {
    const { playAudioNav, pauseAudioNav, audio, playing, playNext, playPrev, cueList } = this.props;
    function showPlayPause() {
      const player = document.querySelector('.att_player')
      if (player && (player.src.indexOf('.mp3') > -1)) {
        return (
          <div className="play-pause">
            {
              cueList.length > 0 ?
              <span className="fa fa-step-backward fa-2x play-prev" type="button" onClick={playPrev} /> : ''
            }
            {
              playing ?
              <span className="fa fa-pause fa-2x nav-pause" type="button" onClick={pauseAudioNav} /> :
              <span className="fa fa-play fa-2x nav-play" type="button" onClick={playAudioNav} />
            }
            {
              cueList.length > 0 ?
              <span className="fa fa-step-forward fa-2x play-next" type="button" onClick={playNext} /> : ''
            }
          </div>
        );
      }
    }

    return (
      <div className="audio-player-container">
        <div className="player">
          { showPlayPause() }
          <div id="currentTime" className="current-time">0:00</div>
          <input
            id="songSlider"
            className="song-slider"
            type="range"
            min="0"
            step="1"
            onChange={this.props.seekSong}
          />
          <div id="duration" className="duration">0:00</div>
          <audio id="att_player" src="" className="att_player" ref="att_player" preload="true" />
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
