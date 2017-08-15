import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import SongMeta from './SongMeta';
import FontAwesome from 'react-fontawesome';


class Song extends Component {
    constructor(props){
      super(props)

      this.state = {
        showMeta: false
      }
    }

    clickSong = (e) => {
      e.preventDefault();
      this.setState({
        showMeta: !this.state.showMeta
      })
      this.props.setUrl(e)
    }

    renderSongMeta = () => {
      let song = this.props.song;
      if(this.state.showMeta){
        return <SongMeta song={song}/>
      }
    }

    render(){
      return (
        <li className="list-group-item song">
          <div className="" onClick={this.clickSong}>
            <div>
              {!this.state.showMeta ? <FontAwesome className="fa fa-chevron-down" aria-hidden="true"></FontAwesome>
                : <FontAwesome className="fa fa-chevron-up" aria-hidden="true"></FontAwesome>}
                <span className="song-name">{this.props.song.name}</span>
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
