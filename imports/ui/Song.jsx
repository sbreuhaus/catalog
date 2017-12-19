import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      // const slider = setInterval(this.props.upDateSongSliderTwo, 1000);
      // this.setState({ slider });
      this.props.setCue(this.props.song)
    }

    playAudio = (e) => {
      e.preventDefault();
      const slider = setInterval(this.props.upDateSongSliderTwo, 1000);
      this.setState({ slider });
      const showDuration = this.props.showDuration;
      const sound = document.getElementById('att_player');
      //debugger;
      this.props.whichSong(this.props.song.name)
      if(sound.src === `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`){
        const intervalId = setInterval(showDuration, 1000);
        this.props.isPlaying();
        this.setState({ intervalId, songIsPlaying: true });
        //debugger;
        sound.play();
        return;
      } else {
        sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
        const intervalId = setInterval(showDuration, 1000);
        this.props.isPlaying();
        this.setState({ intervalId, songIsPlaying: true });
        //debugger;
        sound.play();
      }
      console.log('playAudio');

    }

    pauseAudio = (e) => {
      e.preventDefault();
      const sound = document.getElementById('att_player');
      this.setState({ songIsPlaying: false })
      this.props.isPaused();
      sound.pause();
    }

    altPlayOrPause = (mix) => {
      const that = this;
      const mmmUrl = 'http://www.manmademusic.com/files/att_microcatalog/resources/';
      const sound = this.props.audio;
      function altPlayAudio(e) {
        e.preventDefault();

        that.props.whichSong(mix.name)
        const showDuration = that.props.showDuration;
        sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${mix.url}.mp3`;
        const intervalId = setInterval(showDuration, 1000);
        that.props.isPlaying();
        that.setState({ intervalId, songIsPlaying: true });
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
          {
            this.props.playlist === 'Anthem/Sponsorship Package' ?
            <div className="download"><span className="fa fa-download fa-lg" style={{ color: 'white' }}></span><span className="song-name">alt mix</span></div> :
            <span className="song-name">Light Mix</span>
          }
        </li>
      );
    }

    componentWillUnmount() {
      console.log("Songs unmounted");
      //clearInterval(this.state.intervalId);
      //clearInterval(this.state.slider);
    }

    render() {
      const name = this.props.song.name;
      const that = this;
      const sound = this.props.audio;
      const songIsPlaying = this.state.songIsPlaying;
      const playing = this.props.playing;
      const songAltMixes = this.state.songAltMixes;
      const mmmUrl = 'http://www.manmademusic.com/files/att_microcatalog/resources/';
      function playOrPause() {
        if (playing === false || sound.src !== `${mmmUrl}${that.props.song.url}.mp3`) {
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
            <SongMetaModal
              song={this.props.song}
              altMixes={songAltMixes}
            />
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
