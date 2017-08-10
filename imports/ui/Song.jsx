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
      let song = this.props.song;
      console.log("i want to pass songs to songsMeta", song);
      if(this.state.showMeta){
        return <SongMeta song={song}/>
      }
    }

    render(){
      return (
        <li className="list-group">
          <div className="list-group-item" onClick={this.clickSong}>
            {this.props.song.name}
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
