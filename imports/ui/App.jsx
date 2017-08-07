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
import DisplayTable from './DisplayTable';

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
      matchedSongs: undefined
    }
    this.clickGenre = this.clickGenre.bind(this);
    this.clickPlaylist = this.clickPlaylist.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDisplayTable = this.handleDisplayTable.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({songs: nextProps.songs})
  }

  clickGenre(e) {
    console.log("genre what is this?", this);
    this.handleSetGenre(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, "")); //strip html tags
    this.toggleView()
  }

  toggleView() {
    this.setState({
      isGenre: !this.state.isGenre,
    })
  }

  handleSetGenre(genre) {
    this.setState({genre: genre})
  }

  clickPlaylist(e) {
    console.log("playlist what is this?", this);
    console.log("e.target.innerHTML", e.target.innerHTML);
    this.handleSetPlaylist(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, "")); //strip html tags
  }

  handleSetPlaylist(playList) {
    console.log("handleSetPlaylist firing");
    this.setState({
      playList: playList,
      isGenre: !this.state.isGenre
    })
  }

  handleFilterGenrePlaylist() {
    if(this.state.isGenre){
      //console.log("genre is now showing");
      let allSongs = this.state.songs;
      let genres = [];
      let playLists = [];
      for(var i = 0; i < allSongs.length; i ++) {
          let genre = allSongs[i].genre;
          let playList = allSongs[i].playlist;
          //console.log("playlist", playList);
          if(genres.indexOf(genre) == -1){
            genres.push(genre)
          }
          if(playLists.indexOf(playList) == -1){
            if(playList.length){playLists.push(playList)}
          }
        }

      return (
        <div className="container">
          <div className="row">
            <h2>Filter by genre</h2>
            {genres.map((genre, index) => <Genre key={index} genre={genre} ref={genre} clickGenre={this.clickGenre}/>)}
          </div>
          <div className="row playlist-container">
            <h2>Filter by playlist</h2>
            {playLists.map((playList, index) => <PlayList key={index} playList={playList} ref={playList} clickPlaylist={this.clickPlaylist}/>)}
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
        </div>
        )
      }
    }

    handleShowPlayListSongs() {
      if(!this.state.isGenre){
        console.log("bout to render playlist songs!!!");
        let filterSongs = this.state.songs;
        let filtered = [];
        let filterPlaylist = this.state.playList;
        for(var i = 0; i < filterSongs.length; i ++) {
          let song = filterSongs[i].name;
          let playlist = filterSongs[i].playlist;
          if(playlist == filterPlaylist) {
            filtered.push(song)
          }
        }
        return (
          <div className="row">
            {filtered.map((song, index) => (<Song song={song} key={index}/>))}
          </div>
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
      for(var i=0; i<haystack.length; i++) if(this.compareObjects(haystack[i], needle)) return true;
      return false;
    }

    handleSearch(e) {
      e.preventDefault();
      this.setState({searchMatches: e.target.value.trim()})
      let songs = this.state.songs;
      let matches = [];
      let searchMatches = this.state.searchMatches;

      for(var i=0; i<songs.length; i++) {
        for(key in songs[i]) {
          if(songs[i][key].toString().toLowerCase().indexOf(searchMatches)!=-1) {
            console.log("itemexists.  what is this?", this);
            if(!this.itemExists(matches, songs[i])) matches.push(songs[i]);

          }
        }
      }
      console.log(matches);
      this.setState({matchedSongs: matches})
    }

    handleDisplayTable() {
      let matchedSongs = this.state.matchedSongs;
      if(this.state.searchMatches){
        return (
          <div>
            {matchedSongs.map((song, index) => (<DisplayTable song={song} key={index}/>))}
          </div>
        )
      }
    }

    render() {
      let isGenre = this.state.isGenre;
      let searchMatches = this.state.searchMatches;
      return (
        <div className="container">
          <div className="form">
            <SearchBar handleSearch={this.handleSearch}/>
          </div>
          <h1>{this.state.searchMatches}</h1>
          {this.handleDisplayTable()}
          {this.handleFilterGenrePlaylist()}
          {this.handleShowSongGenres()}
          {this.handleShowPlayListSongs()}
          {!isGenre ? <BackToGenres toggleView={this.toggleView.bind(this)}/> : ''}
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

// filtered.map((genre, index) => {
//   return (
//     <div className="container">
//       <Genre key={index} genre={genre} ref={genre} clickGenre={this.clickGenre}/>
//     </div>
//   )
// });


// else if(!this.state.isGenre) {
//     let filterSongs = this.state.songs;
//     let filtered = [];
//     let filterGenre = this.state.genre;
//     for(var i = 0; i < filterSongs.length; i ++) {
//         let song = filterSongs[i].name;
//         let genre = filterSongs[i].genre;
//         if(genre == filterGenre) {
//           filtered.push(song)
//         }
//       }
//     return (
//       <div className="row">
//         <h1>{filterGenre}</h1>
//         {filtered.map((song, index) => (<Song song={song} key={index}/>))}
//         <BackToGenres toggleView={this.toggleView.bind(this)}/>
//       </div>
//       )
//     } else if(!this.state.isPlaylist){
//       let filterSongs = this.state.songs;
//       let filtered = [];
//       let filterPlaylist = this.state.playlist;
//       for(var i = 0; i < filterSongs.length; i ++) {
//           let song = filterSongs[i].name;
//           let playlist = filterSongs[i].playlist;
//           if(playlist == filterPlaylist) {
//             filtered.push(song)
//           }
//         }
//       return (
//         <div className="row">
//           {filtered.map((song, index) => (<Song song={song} key={index}/>))}
//           <BackToGenres toggleView={this.toggleView.bind(this)}/>
//         </div>
//       )
//     }
