import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AltMixes from './AltMixes';
import SongMetaModal from './SongMetaModal';

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
        altMixes: undefined,
        songAltMixes: this.props.altMixes
      };
    }


    componentDidMount() {
      console.log('thi.props.altmixes', this.props.altMixes);
      // if (this.state.altMixes){
      //   this.findAltMixes();
      //   console.log('MOUNTING');
      // }

      //console.log("elements", elements.newSound);
      //console.log("Songs Mounted");
      let slider = setInterval(this.props.upDateSongSliderTwo, 500);
      this.setState({ slider });
      //console.log("this.state.matchedSongs", this.state.matchedSongs);
      // console.log('this.props.playlist', this.props.playlist);
    }

    // findAltMixes = () => {
    //   const name = this.state.name;
    //   const altMixes = this.state.altMixes;
    //   const songAltMixes = altMixes.filter(mix => mix.parent_track === name)
    //   this.setState({ songAltMixes })
    // }

    playAudio = (e) => {
      e.preventDefault();
      const showDuration = this.props.showDuration;
      //debugger;
      console.log('playAudio');
      const sound = document.getElementById('att_player');
      sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
      const intervalId = setInterval(showDuration, 2000);
      this.props.isPlaying();
      this.setState({ intervalId, songIsPlaying: true });
      //debugger;
      sound.play();
    }

    pauseAudio = (e) => {
      e.preventDefault();
      const sound = document.getElementById('att_player');
      this.setState({ songIsPlaying: false })
      this.props.isPaused();
      sound.pause();
    }

    componentWillUnmount() {
      console.log("Songs unmounted");
      // clearInterval(this.state.intervalId);
      // clearInterval(this.state.slider);
    }

    altPlayOrPause = (mix) => {
      const that = this;
      const mmmUrl = 'http://www.manmademusic.com/files/att_microcatalog/resources/';
      const sound = this.props.audio;
      function altPlayAudio(e) {
        e.preventDefault();
        const showDuration = that.props.showDuration;
        //debugger;
        console.log('altplayAudio', e.target);
        sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${mix.url}.mp3`;
        const intervalId = setInterval(showDuration, 2000);
        that.props.isPlaying();
        that.setState({ intervalId, songIsPlaying: true });
        //debugger;
        sound.play();
      }

      if (this.state.songIsPlaying === false || sound.src !== `${mmmUrl}${mix.url}.mp3`) {
        return (
          <div className="play-button" type="button" onClick={altPlayAudio}>
            <span className="fa fa-play fa-lg" />
          </div>
        );
      } else if (sound.src === `${mmmUrl}${mix.url}.mp3`) {
        return (
          <div className="pause-button" type="button" onClick={that.pauseAudio}>
            <span className="fa fa-pause fa-lg" />
          </div>
        );
      }
    }

    altMixHandler = () => {
      const songAltMixes = this.state.songAltMixes;
      return songAltMixes.map((mix, index) =>
              <li key={index} className="alt-mix-name">
                {this.altPlayOrPause(mix)}
                <span className="song-name">{mix.name}</span>
              </li>
            );
          }

    render() {
      const name = this.props.song.name;
      const that = this;
      const sound = this.props.audio;
      const songIsPlaying = this.state.songIsPlaying;
      const songAltMixes = this.state.songAltMixes;
      const mmmUrl = 'http://www.manmademusic.com/files/att_microcatalog/resources/';
      function playOrPause() {
        if (songIsPlaying === false || sound.src !== `${mmmUrl}${that.props.song.url}.mp3`) {
          return (
            <div className="play-button" type="button" onClick={that.playAudio}>
              <span className="fa fa-play fa-lg" />
            </div>
          );
        } else if (sound.src === `${mmmUrl}${that.props.song.url}.mp3`) {
          return (
            <div className="pause-button" type="button" onClick={that.pauseAudio}>
              <span className="fa fa-pause fa-lg" />
            </div>
          );
        }
      }
      function download() {
        if (that.props.playlist === 'Anthem/Sponsorship Package') {
          return <a className="download" href={`${mmmUrl}${that.props.song.url}.mp3`} download><span className="fa fa-download fa-lg"></span></a>
        }
      }
      return (
        <li className="list-group-item song" id={name}>
            <SongMetaModal song={this.props.song} />
            <div className="song-name-container">
              <div className="song-controller">
                { playOrPause() }
                { download() }
                <span className="song-name" ref="song">{name}</span>
              </div>
              {
                songAltMixes !== undefined && songAltMixes.length > 0 ?
              <ul className="alt-mix-container">
                {this.altMixHandler()}
              </ul>
                : ''
              }
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

// <AltMixes
//   sound={sound}
//   altMixes={this.state.songAltMixes}
//   mmmUrl={mmmUrl}
//   playAudio={this.playAudio}
//   pauseAudio={this.pauseAudio}
//   song={this.props.song}
//   songIsPlaying={songIsPlaying}
//   showDuration={this.props.showDuration}
// />
