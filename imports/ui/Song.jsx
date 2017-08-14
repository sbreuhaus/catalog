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
      //console.log("Song clicked!!");
      this.setState({
        showMeta: !this.state.showMeta
      })
      this.props.setUrl(e)
    }

    renderSongMeta = () => {
      //console.log("renderSongMeta");
      let song = this.props.song;
      //console.log("i want to pass songs to songsMeta", song);
      if(this.state.showMeta){
        return <SongMeta song={song}/>
      }
    }

    render(){
      return (
        <li className="list-group-item">
          <div className="" onClick={this.clickSong}>
            <div>
              {!this.state.showMeta ? <FontAwesome className="fa fa-chevron-down" aria-hidden="true"></FontAwesome>
                : <FontAwesome className="fa fa-chevron-up" aria-hidden="true"></FontAwesome>}  {this.props.song.name}
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
