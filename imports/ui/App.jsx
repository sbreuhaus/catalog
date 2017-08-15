import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Masonry from 'react-masonry-component';
import '../../client/main.css';

const masonryOptions = {
    itemSelector: '.grid-item',
    transitionDuration: 0,
    columnWidth: '.sizer'
};

//songs collection
import { Songs } from '../api/songs.js';

//components
import Song from './Song.jsx';
import Genre from './Genre.jsx';
import BackToHome from './BackToHome.jsx';
import SearchBar from './SearchBar';
import PlayList from './PlayList';
import DisplayTable from './DisplayTable';
import MusicPlayer from './MusicPlayer';
import NavBar from './NavBar';
import SongMeta from './SongMeta';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGenre: true,
      isPlaylist: true,
      genre: '',
      playList: '',
      songs: this.props.songs,
      searchMatches: '',
      matchedSongs: undefined,
      playerSong: undefined,
      songMeta: false,
      selectedUrl: undefined,
      songUrl: undefined
    }
    this.clickGenre = this.clickGenre.bind(this);
    this.clickPlaylist = this.clickPlaylist.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDisplayTable = this.handleDisplayTable.bind(this);
  }

  componentWillReceiveProps(nextProps) { // Meteor createContainer sends data in chunks.  This receives it.
    this.setState({songs: nextProps.songs})
  }

  clickGenre(e) {
    console.log("genre what is this?", this);
    this.handleSetGenre(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, "")); //strip html tags
    this.toggleView()
  }

  toggleView = () => {
    this.setState({
      isGenre: !this.state.isGenre,
    })
  }

  clickToHome = (e) => { // passed to BackToHome component
    this.toggleView()
    this.handleClearState()
  }

  handleClearState = () => { // set state to empty strings
    this.setState({
      genre: '',
      playList: '',
      selectedUrl: '',
      songUrl: ''
    })
  }

  handleSetGenre(genre) {
    this.setState({genre: genre})
  }

  clickPlaylist(e) { //click handler to set state of playlist
    this.handleSetPlaylist(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""));
  }

  handleSetPlaylist(playList) {
    this.setState({
      playList: playList,
      isGenre: !this.state.isGenre
    })
  }

  handleSetUrl = (e) => { //grabs song name from click event.  matches that to song object and grabs url.
    e.preventDefault();
    let selectedUrl = e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, "").trim()
    this.setState({selectedUrl: selectedUrl})
    let songs = this.state.songs;
    let filtered = songs.filter( song => song.name == selectedUrl)
    let newUrl = filtered[0].url;
    this.setState({songUrl: newUrl})
  }

  handleFilterGenrePlaylist() { // on page load, filter through all genre's and playlists and display no duplicates
    if(this.state.isGenre){
      let allSongs = this.state.songs;
      let genres = [];
      let playLists = [];
      for(var i = 0; i < allSongs.length; i ++) {
          let genre = allSongs[i].genre;
          let playList = allSongs[i].playlist;
          if(genres.indexOf(genre) == -1){
            genres.push(genre)
          }
          if(playLists.indexOf(playList) == -1){
            if(playList.length){playLists.push(playList)}
          }
        }

      return (
        <div className="container">
          <div className="row playlist-container">
            <h2 id="playlist">playlists</h2>
            <div className="grid-playlist">
              {playLists.map((playList, index) => <PlayList key={index} playList={playList} ref={playList} clickPlaylist={this.clickPlaylist}/>)}
            </div>
          </div>
          <div className="row">
            <h2 id="genre">genres</h2>
            <div className="grid-genre">
              {genres.map((genre, index) => <Genre key={index} genre={genre} ref={genre} clickGenre={this.clickGenre}/>)}
            </div>
          </div>
        </div>
      )
    }
  }

  handleShowSongGenres() {
    if(!this.state.isGenre) {
      let filterSongs = this.state.songs;
      let filtered = [];
      let filterGenre = this.state.genre;
      let songMeta = this.state.songMeta;
      for(var i = 0; i < filterSongs.length; i ++) {
          let song = filterSongs[i];
          let genre = filterSongs[i].genre;
          if(genre == filterGenre) {
            filtered.push(song)
          }
        }
      return (
        <ul className="list-group">
          <h1>{filterGenre}</h1>
          { filtered.length > 8 ? <BackToHome clickToHome={this.clickToHome}/> : ''}
          { filtered.map((song, index) => (<Song song={song} key={index} setUrl={this.handleSetUrl}/>)) }
        </ul>
        )
      }
    }

    handleShowPlayListSongs() {
      if(!this.state.isGenre){
        let filterSongs = this.state.songs;
        let filtered = [];
        let filterPlaylist = this.state.playList;
        for(var i = 0; i < filterSongs.length; i ++) {
          let song = filterSongs[i];
          let playlist = filterSongs[i].playlist;
          if(playlist == filterPlaylist && playlist != '') {
            filtered.push(song)
          }
        }
        return (
          <ul className="list-group">
            <h1>{filterPlaylist}</h1>
            { filtered.length > 8 ? <BackToHome clickToHome={this.clickToHome}/> : ''}
            { filtered.map((song, index) => (<Song song={song} key={index} clickSong={this.clickSong} setUrl={this.handleSetUrl}/>)) }
          </ul>
        )
      }
    }

    trimString = (s) => {
      let l = 0, r = s.length -1;
      while (l < s.length && s[l] == ' ') l++;
      while (r > l && s[r] == ' ') r -= 1;
      return s.substring(l, r + 1);
    }

    compareObjects = (o1, o2) => {
      let k = '';
      for(k in o1) if(o1[k] != o2[k]) return false;
      for(k in o2) if(o1[k] != o2[k]) return false;
      return true;
    }

    itemExists = (haystack, needle) => {
      for (var i = 0; i < haystack.length; i++) if(this.compareObjects(haystack[i], needle)) return true;
      return false;
    }

    handleSearch(e) {
      e.preventDefault();
      this.setState({searchMatches: e.target.value.trim()})
      let songs = this.state.songs;
      let matches = [];
      let searchMatches = this.state.searchMatches;

      for(var i = 0; i < songs.length; i++) {
        for(key in songs[i]) {
          if(songs[i][key].toString().toLowerCase().indexOf(searchMatches)!=-1) {
            if(!this.itemExists(matches, songs[i])) matches.push(songs[i]);

          }
        }
      }
      this.setState({matchedSongs: matches})
    }

    showMusicPlayer = () => {
      let songUrl = this.state.songUrl;
      if(this.state.selectedUrl || this.state.searchMatches){
        return <MusicPlayer songUrl={songUrl} selectedUrl={this.state.selectedUrl}/>
      }
    }

    handleDisplayTable() {
      let matchedSongs = this.state.matchedSongs;
      if(this.state.searchMatches){
        return (
          <div>
            { matchedSongs.map((song, index) => (<DisplayTable song={song} key={index} clickSong={this.clickSong}/>)) }
          </div>
        )
      }
    }

    render() {
      let isGenre = this.state.isGenre;
      let searchMatches = this.state.searchMatches;
      let songUrl = this.state.songUrl;
      return (
        <div>
          <NavBar />
          <div className="container">
            <div className="row">
              <img className="mmm-logo" src="/MMM Logo_Text Only.png"></img>
              <SearchBar handleSearch={this.handleSearch}/>
            </div>
            <div className="row audio-player">
              { this.showMusicPlayer() }
            </div>
            <div className="row">
              { this.handleDisplayTable() }
              { this.handleFilterGenrePlaylist() }
              { this.handleShowSongGenres() }
              { this.handleShowPlayListSongs() }
              { !isGenre ? <BackToHome clickToHome={this.clickToHome}/> : '' }
            </div>
          </div>
        </div>
      )
    }
}

App.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const songs = Songs.find({}).fetch()
  //console.log("just came from db", songs);
  //const genres = _.uniq(songs.find({}, { genre: true}), false, (obj) => obj.genre);

  return {
    songs
  };
}, App);
