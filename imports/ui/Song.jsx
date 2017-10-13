import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import SongMeta from './SongMeta';
import elements from '../startup/audioEl.js';
import AltMixes from './AltMixes';


class Song extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showMeta: false,
        name: this.props.song.name,
        intervalId: undefined,
        slider: undefined,
        matchedSongs: this.props.matchedSongs,
        songIsPlaying: false,
        altMixes: this.props.altMixes,
        songAltMixes: undefined
      };
    }

    componentDidMount() {
      this.findAltMixes();
      //console.log("elements", elements.newSound);
      //console.log("Songs Mounted");
      let slider = setInterval(this.props.upDateSongSliderTwo, 500);
      this.setState({ slider });
      //console.log("this.state.matchedSongs", this.state.matchedSongs);
      // console.log('this.props.playlist', this.props.playlist);
    }

    findAltMixes = () => {
      const name = this.state.name;
      const altMixes = this.state.altMixes;
      const songAltMixes = altMixes.filter(mix => mix.parent_track === name)
      this.setState({ songAltMixes })
    }

    clickChevron = (e) => {
      e.preventDefault();
      this.setState({
        showMeta: !this.state.showMeta
      });
    }

    renderSongMeta = () => {
      const song = this.props.song;
      if (this.state.showMeta) {
        return <SongMeta song={song} />;
      }
    }

    playAudio = (e) => {
      e.preventDefault();
      const showDuration = this.props.showDuration;
      //debugger;
      console.log('playAudio');
      const sound = document.querySelector('.att_player');
      sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
      const intervalId = setInterval(showDuration, 2000);
      this.props.isPlaying();
      this.setState({ intervalId, songIsPlaying: true });
      //debugger;
      sound.play();
    }

    pauseAudio = (e) => {
      e.preventDefault();
      const sound = document.querySelector('.att_player');
      this.setState({ songIsPlaying: false })
      this.props.isPaused();
      sound.pause();
    }

    componentWillUnmount() {
      console.log("Songs unmounted");
      // clearInterval(this.state.intervalId);
      // clearInterval(this.state.slider);
    }

    render() {
      const name = this.props.song.name;
      const playing = this.props.playing;
      const that = this;
      const sound = this.props.audio;
      const playlist = this.props.playlist;
      const songIsPlaying = this.state.songIsPlaying;
      function playOrPause() {
        if (songIsPlaying === false) {
          return (
            <div className="play-button" type="button" onClick={that.playAudio}>
              <span className="fa fa-play fa-lg" />
            </div>
          )
        } else if (sound.src === `http://www.manmademusic.com/files/att_microcatalog/resources/${that.props.song.url}.mp3`) {
          return (
            <div className="pause-button" type="button" onClick={that.pauseAudio}>
              <span className="fa fa-pause fa-lg" />
            </div>
          )
        }
      }
      function download() {
        if (that.props.playlist === 'Anthem/Sponsorship') {
          return <a href={`http://www.manmademusic.com/files/att_microcatalog/resources/${that.props.song.url}.mp3`} download><span className="fa fa-download fa-lg"></span></a>
        }
      }
      return (
        <li className="list-group-item song" id={name}>
          <div>
            <div className="song-controller">
              {
                !this.state.showMeta ?
                  <FontAwesome
                    onClick={this.clickChevron}
                    className="fa fa-chevron-down song-meta"
                    aria-hidden="true"
                  />

                  : <FontAwesome
                    onClick={this.clickChevron}
                    className="fa fa-chevron-up song-meta"
                    aria-hidden="true"
                  />

              }
                { playOrPause() }
                { download() }
                <span className="song-name" onClick={this.clickSong} ref="song">{name}</span>
                {
                  this.props.sponsorAltMix ?
                  <AltMixes altMixes={this.state.songAltMixes} />
                  : ''
                }
            </div>
            {this.renderSongMeta()}
          </div>
        </li>
      );
  }
}

export default Song;

Song.propTypes = {
  song: PropTypes.object
};

// upDateSongSlider = () => {
//   let sound = document.querySelector('.att_player');
//   let songSlider = document.getElementById('songSlider');
//   let currentTime = document.getElementById('currentTime');
//   // Set max value when you know the duration
//   sound.onloadedmetadata = () => songSlider.max = sound.duration;
//   // update audio position
//   songSlider.onchange = () => sound.currentTime = songSlider.value;
//   // update range input when currentTime updates
//   sound.ontimeupdate = () => songSlider.value = sound.currentTime;
//   currentTime.textContent = sound.currentTime;
// }
