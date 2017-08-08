import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import SongMeta from './SongMeta';

class Song extends Component {
    constructor(props){
      super(props)

      this.state = {
        showMeta: false
      }
    }

    clickSong = (e) => {
      e.preventDefault();
      console.log("Song clicked!!");
      this.setState({showMeta: !this.state.showMeta})
    }

    renderSongMeta = () => {
      console.log("renderSongMeta");
      if(this.state.showMeta){
        return <SongMeta />

      }
    }

    render(){
      return (
        <li className="list-group">
          <div className="list-group-item" onClick={this.clickSong}>{this.props.song.name}</div>
          {this.renderSongMeta()}
        </li>
      );
  }
}

export default Song;

Song.propTypes = {

  song: PropTypes.object
};
