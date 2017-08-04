import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';


//songs collection
import { Songs } from '../api/songs.js';

//components
import Song from './Song.jsx';
import Genre from './Genre.jsx';
import BackToGenres from './BackToGenres';
import SearchBar from './SearchBar';
import PlayList from './PlayList';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isGenre: true,
      isPlaylist: true,
      genre: '',
      songs: this.props.songs
    }
    this.clickGenre = this.clickGenre.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({songs: nextProps.songs})
  }

  clickGenre(e) {
    this.handleSetGenre(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, "")); //strip html tags
    this.toggleView()
  }

  toggleView() {
    console.log("toggle view");
    this.setState({
      isGenre: !this.state.isGenre,
    })
  }

  handleSetGenre(genre) {
    console.log("handleGenre");
    this.setState({genre: genre})
  }

  handleFilterGenre() {
    if(this.state.isGenre){
      //console.log("genre is now showing");
      let filterGenres = this.state.songs;
      let filtered = [];
      for(var i = 0; i < filterGenres.length; i ++) {
          let genre = filterGenres[i].genre;
          if(filtered.indexOf(genre) == -1){
            filtered.push(genre)
          }
        }
      return (
          <div className="row genre-container">
            {filtered.map((genre, index) => <Genre key={index} genre={genre} ref={genre} clickGenre={this.clickGenre}/>)}
          </div>

      )
    } else if(!this.state.isGenre) {
        let filterSongs = this.state.songs;
        let filtered = [];
        let filterGenre = this.state.genre;
        for(var i = 0; i < filterSongs.length; i ++) {
            let song = filterSongs[i].name;
            let genre = filterSongs[i].genre;
            if(genre == filterGenre) {
              filtered.push(song)
            }
          }
        return (
          <div className="row">
            <h1>{filterGenre}</h1>
            {filtered.map((song, index) => (<Song song={song} key={index}/>))}
            <BackToGenres toggleView={this.toggleView.bind(this)}/>
          </div>
          )
        }
      }

  handleFilterPlayList() {
    if(this.state.isPlaylist){
      return <PlayList />
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <SearchBar />
        </div>
        {this.handleFilterGenre()}
        {this.handleFilterPlayList()}
      </div>
    )
  }
}

App.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const songs = Songs.find({}).fetch()
  console.log("just came from db", songs);
  //const genres = _.uniq(songs.find({}, { genre: true}), false, (obj) => obj.genre);

  return {
    songs
  };
}, App);

// filtered.map((genre, index) => {
//   return (
//     <div className="container">
//       <Genre key={index} genre={genre} ref={genre} clickGenre={this.clickGenre}/>
//     </div>
//   )
// });
