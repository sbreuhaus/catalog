import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import SongMeta from './SongMeta';
import FontAwesome from 'react-fontawesome';


class Song extends Component {
    constructor(props){
      super(props)

      this.state = {
        showMeta: false,
        name: this.props.song.name
      }
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

    render(){
      let name = this.state.name;
      return (
        <li className="list-group-item song">
          <div>
            <div>
              {!this.state.showMeta ? <FontAwesome onClick={this.clickChevron} className="fa fa-chevron-down" aria-hidden="true"></FontAwesome>
            : <FontAwesome onClick={this.clickChevron} className="fa fa-chevron-up" aria-hidden="true"></FontAwesome>}
                <span className="song-name" onClick={this.clickSong}>{name}</span>
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
