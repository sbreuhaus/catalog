import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import SongMeta from './SongMeta';
import FontAwesome from 'react-fontawesome';
import ReactDOM from 'react-dom';


class Song extends Component {
    constructor(props){
      super(props)

      this.state = {
        showMeta: false,
        name: this.props.song.name,
      }
    }

    componentDidMount(){
      let song = ReactDOM.findDOMNode(this.refs.song);
      console.log("HOPEFULLY THIS IS THE SONG", song);

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

    playAudio = (e) => {
      e.preventDefault()
      console.log("playAudio");
      // console.log("this.refs", this.refs);
      // let sound = ReactDOM.findDOMNode(this.refs.att_player)
      let sound = document.querySelector('.att_player');
      // console.log("sound", sound);
      // console.log("WHERE THE PROPS", this.props);
      sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
      sound.play();
    }

    pauseAudio = (e) => {
      e.preventDefault();
      let sound = document.querySelector('.att_player');
      sound.pause()
    }

    upDateSongSlider = () => {

      let c = Math.round()
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
