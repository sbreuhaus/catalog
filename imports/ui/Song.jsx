import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import SongMeta from './SongMeta';
import FontAwesome from 'react-fontawesome';
import ReactDOM from 'react-dom';
import { sound } from '../startup/audioEl.js';


class Song extends Component {
    constructor(props){
      super(props)

      this.state = {
        showMeta: false,
        name: this.props.song.name,
        intervalId: undefined,
        slider: undefined
      }
    }

    componentDidMount(){
      // let song = ReactDOM.findDOMNode(this.refs.song);
      console.log("Songs Mounted");
      let slider = setInterval(this.upDateSongSliderTwo, 500);
      this.setState({slider: slider})
      // let duration = document.querySelector('.duration');
      // duration.textContent = "00:00";
      // console.log("sound.textContent", duration.textContent);
    }

    clickSong = (e) => {
      e.preventDefault();
      this.setState({
        showMeta: !this.state.showMeta
      })
      this.props.setUrl(e)
    }

    clickChevron = (e) => {
      e.preventDefault();
      this.setState({
        showMeta: !this.state.showMeta
      })
    }

    renderSongMeta = () => {
      let song = this.props.song;
      if(this.state.showMeta){
        return <SongMeta song={song}/>
      }
    }

    showDuration = () => {
      let sound = document.querySelector('.att_player');
      let duration = document.querySelector('.duration');
      let songSlider = document.getElementById('songSlider');
      if(sound){
        sound.addEventListener('loadedmetadata', () => {
          let d = Math.floor(sound.duration);
          duration.textContent = this.props.convertTime(d);
          songSlider.setAttribute("max", d);
          console.log("THIS IS D", d);
        })
    } else {
        console.log("sound does not exist");
        return
      }
    }

    playAudio = (e) => {
      e.preventDefault()
      console.log("playAudio");
      let sound = document.querySelector('.att_player');
      sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
      //debugger;
      let intervalId = setInterval(this.showDuration, 2000);
      this.setState({intervalId: intervalId})
      sound.play();
    }

    pauseAudio = (e) => {
      e.preventDefault();
      let sound = document.querySelector('.att_player');
      sound.pause()
    }

    upDateSongSliderTwo = () => {
      let sound = document.querySelector('.att_player');

      if(sound){
        let songSlider = document.getElementById('songSlider');
        let currentTime = document.getElementById('currentTime');
        //console.log("What is sound.current time", sound.currentTime);
        let c = Math.round(sound.currentTime);
        songSlider.value = sound.currentTime;
        currentTime.textContent = this.props.convertTime(c);
      } else {
        console.log("sound does not exist");
        return
      }

    }

    componentWillUnmount(){
      console.log("Songs unmounted");
      clearInterval(this.state.intervalId);
      clearInterval(this.state.slider);
    }

    render(){
      let name = this.state.name;
      return (
        <li className="list-group-item song">
          <div>
            <div className="song-controller">
              {
                !this.state.showMeta ? <FontAwesome onClick={this.clickChevron} className="fa fa-chevron-down song-meta" aria-hidden="true"></FontAwesome>
              : <FontAwesome onClick={this.clickChevron} className="fa fa-chevron-up song-meta" aria-hidden="true"></FontAwesome>
              }
                <div className="play-button" type="button" onClick={this.playAudio}><span className="fa fa-play"></span></div>
                <div className="pause-button" type="button" onClick={this.pauseAudio}><span className="fa fa-pause"></span></div>
                <span className="song-name" onClick={this.clickSong} ref="song">{name}</span>
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
