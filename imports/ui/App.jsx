import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Masonry from 'react-masonry-component';
import '../../client/main.css';

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
import AccountsUIWrapper from './AccountsUIWrapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGenre: true,
      isPlaylist: true,
      genre: '',
      playList: '',
      songs: this.props.songs,
      searchMatches: '',
      matchedSongs: [],
      playerSong: undefined,
      songMeta: false,
      selectedUrl: undefined,
      songUrl: undefined,
      playing: false,
      sponsorshipSongs: undefined
    }
    this.clickGenre = this.clickGenre.bind(this);
    this.clickPlaylist = this.clickPlaylist.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.DisplaySearchResults = this.DisplaySearchResults.bind(this);
  }

  componentDidMount() {
    const songs = this.state.songs;
    const sponsorship = songs.filter((song) => {
      return song.sponsorship === 'yes';
    });
    this.setState({ sponsorshipSongs: sponsorship });
  }

  componentWillReceiveProps(nextProps) { // Meteor createContainer sends data in chunks.  This receives it.
    const songs = nextProps.songs;
    const sponsorship = songs.filter((song) => {
      return song.sponsorship === 'yes';
    });
    this.setState({ songs: nextProps.songs, sponsorshipSongs: sponsorship });
  }

  clickGenre(e) {
    this.handleSetGenre(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, '')); //strip html tags
    this.toggleView();
  }

  toggleView = () => {
    this.setState({
      isGenre: !this.state.isGenre,
    });
  }

  clickToHome = () => { // passed to BackToHome component
    this.toggleView();
    this.handleClearState();
  }

  handleClearState = () => { // set state to empty strings
    this.setState({
      genre: '',
      playList: '',
      selectedUrl: '',
      songUrl: ''
    });
  }

  handleSetGenre(genre) {
    this.setState({ genre: genre });
  }

  clickPlaylist(e) { //click handler to set state of playlist
    this.handleSetPlaylist(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, ''));
  }

  handleSetPlaylist(playList) {
    this.setState({
      playList,
      isGenre: !this.state.isGenre
    });
  }

  handleSetUrl = (e) => { //grabs song name from click event.  matches that to song object and grabs url.
    e.preventDefault();
    const selectedUrl = e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, '').trim()
    //console.log("selectedurl", selectedUrl);
    this.setState({ selectedUrl });
    const songs = this.state.songs;
    const filtered = songs.filter(song => song.name === selectedUrl);
    const newUrl = filtered[0].url;
    //debugger;
    this.setState({songUrl: newUrl})
  }

  handleFilterGenrePlaylist() { // on page load, filter through all genre's and playlists and display no duplicates
    if (this.state.isGenre) {
      const allSongs = this.state.songs;
      const genres = [];
      const playLists = [];
      for (let i = 0; i < allSongs.length; i++) {
          const genre = allSongs[i].genre;
          const playList = allSongs[i].playlist;
          if (genres.indexOf(genre) === -1) {
            genres.push(genre);
          }
          if (playLists.indexOf(playList) === -1) {
            if (playList.length) { playLists.push(playList); }
          }
        }

      return (
        <div className="container">
          <div className="row playlist-container">
            <h2 id="playlist">PLAYLISTS</h2>
            <div className="grid-playlist">
              {playLists.map((playList, index) =>
                <PlayList
                  key={index}
                  unique={index}
                  playList={playList}
                  ref={playList}
                  clickPlaylist={this.clickPlaylist}
                />
              )}
            </div>
          </div>
          <div className="row">
            <h2 id="playlist">GENRE</h2>
            <div className="grid-genre">
              {genres.map((genre, index) =>
                <Genre
                  key={index}
                  unique={index}
                  genre={genre}
                  ref={genre}
                  clickGenre={this.clickGenre}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  handleShowSongGenres() {
    if (!this.state.isGenre) {
      const filterSongs = this.state.songs;
      const filtered = [];
      const filterGenre = this.state.genre;
      for (let i = 0; i < filterSongs.length; i++) {
          const song = filterSongs[i];
          const genre = filterSongs[i].genre;
          if (genre === filterGenre) {
            filtered.push(song);
          }
        }
      return (
        <ul className="list-group">
          <h1 className="which-alignment">{filterGenre}</h1>
          { filtered.length > 8 ? <BackToHome clickToHome={this.clickToHome} /> : ''}
          { filtered.map((song, index) => (
            <Song song={song} key={index} setUrl={this.handleSetUrl} />)) }
        </ul>
      );
      }
    }

    handleShowPlayListSongs() {
      if (!this.state.isGenre) {
        const filterSongs = this.state.songs;
        let filtered = [];
        const filterPlaylist = this.state.playList;
        const sponsorship = this.state.sponsorshipSongs;
        console.log('filterPlaylist', filterPlaylist);
        if (filterPlaylist === 'Anthem/Sponsorship') {
          console.log('sponsorship inside if', sponsorship);
          filtered = filtered.concat(sponsorship);
        } else {
          for (let i = 0; i < filterSongs.length; i++) {
            const song = filterSongs[i];
            const playlist = filterSongs[i].playlist;
            if (playlist === filterPlaylist && playlist !== '') {
              filtered.push(song);
            }
          }
        }

        return (
          <ul className="list-group">
            <h1 className="which-alignment">{filterPlaylist}</h1>
            { filtered.length > 8 ? <BackToHome clickToHome={this.clickToHome} /> : ''}
            { filtered.map((song, index) => (
              <Song
                playlist={filterPlaylist}
                matchedSongs={this.state.matchedSongs}
                song={song}
                key={index}
                clickSong={this.clickSong}
                setUrl={this.handleSetUrl}
                songUrl={this.state.songUrl}
                isGenre={this.state.isGenre}
                convertTime={this.convertTime}
                playAudio={this.playAudio}
                showDuration={this.showDuration}
                upDateSongSliderTwo={this.upDateSongSliderTwo}
                isPlaying={this.isPlaying}
                isPaused={this.isPaused}
                playing={this.state.playing}
              />)
            ) }
          </ul>
        );
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
      this.setState({ searchMatches: e.target.value.trim().toLowerCase() }, () => {
        const songs = this.state.songs;
        const matches = [];
        const searchMatches = this.state.searchMatches;
        //console.log("searchMatches", searchMatches);
        for (let i = 0; i < songs.length; i++) {
          for (key in songs[i]) {
            //console.log("YO", songs[i][key], searchMatches);
            //console.log(songs[i][key].toString().toLowerCase().indexOf(searchMatches));
            if (songs[i][key].toString().toLowerCase().indexOf(searchMatches)!=-1) {

              if (!this.itemExists(matches, songs[i])) matches.push(songs[i]);
            }
          }
        }
        this.setState({ matchedSongs: matches })
      })
    }

    showMusicPlayer = () => {
      const songUrl = this.state.songUrl;
      console.log('songUrl', songUrl);
      return (
        <MusicPlayer
          songUrl={songUrl}
          selectedUrl={this.state.selectedUrl}
          searchMatches={this.state.searchMatches}
          seekSong={this.seekSong}
          playAudioNav={this.playAudioNav}
          pauseAudioNav={this.pauseAudioNav}
          songUrl={this.state.songUrl}
        />
      );
    }

    DisplaySearchResults() {
      const matchedSongs = this.state.matchedSongs;
      if (this.state.searchMatches) {
        return (
          <div>
            { matchedSongs.map((song, index) => (
              <Song
                song={song}
                key={index}
                clickSong={this.clickSong}
                setUrl={this.handleSetUrl}
                matchedSongs={this.state.matchedSongs}
                setUrl={this.handleSetUrl}
                songUrl={this.state.songUrl}
                isGenre={this.state.isGenre}
                convertTime={this.convertTime}
                playAudio={this.playAudio}
                showDuration={this.showDuration}
                upDateSongSliderTwo={this.upDateSongSliderTwo}
              />))
            }
          </div>
        );
      }
    }

    showDuration = () => {
      console.log("showDuration firing");
      const sound = document.querySelector('.att_player');
      const duration = document.querySelector('.duration');
      const songSlider = document.getElementById('songSlider');
      if (sound) {
        sound.addEventListener('loadedmetadata', () => {
          const d = Math.floor(sound.duration);
          duration.textContent = this.convertTime(d);
          songSlider.setAttribute("max", d);
          console.log("THIS IS D", d);
        })
      } else {
        console.log("sound does not exist");
        return
      }
    }

    upDateSongSliderTwo = () => {
      const sound = document.querySelector('.att_player');
      if (sound.src) {
        const songSlider = document.getElementById('songSlider');
        const currentTime = document.getElementById('currentTime');
        //console.log("What is sound.current time", sound.currentTime);
        const c = Math.round(sound.currentTime);
        songSlider.value = sound.currentTime;
        //debugger;
        currentTime.textContent = this.convertTime(c);
      } else {
        console.log("sound does not exist");
        return
      }
    }

    seekSong = () => {
      console.log("seeksong is firing");
      let sound = document.querySelector('.att_player');
      let songSlider = document.getElementById('songSlider');
      console.log(songSlider.value);
      let currentTime = document.getElementById('currentTime');
      sound.currentTime = songSlider.value;
      currentTime.textContent = this.convertTime(sound.currentTime)
    }

    playAudioNav = (e) => {
      e.preventDefault();
      // const showDuration = this.props.showDuration;
      // debugger;
      // console.log('playAudio');
      const sound = document.querySelector('.att_player');
      // sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
      // const intervalId = setInterval(showDuration, 2000);
      //
      // this.setState({ intervalId: intervalId });
      //debugger;
      sound.play();
    }

    pauseAudioNav = (e) => {
      e.preventDefault();
      const sound = document.querySelector('.att_player');
      sound.pause();
    }

    convertTime = (secs) => {
      let min = Math.floor(secs/60);
      let sec = secs % 60;
      min = (min < 10) ? "0" + min : min;
      sec = (sec < 10) ? "0" + sec : sec;
      return (min + ":" + sec);
    }

    isPlaying = () => {
      this.setState({ playing: true })
    }

    isPaused = () => {
      this.setState({ playing: false })
    }

    render() {
      const isGenre = this.state.isGenre;
      return (

        <div>
          <NavBar
            clickToHome={this.clickToHome}
            showMusicPlayer={this.showMusicPlayer}
          />
          <div className="container">

            <div className="row">

              {this.state.isGenre ? <SearchBar handleSearch={this.handleSearch} /> : ''}
            </div>

            <div className="row">
              { this.DisplaySearchResults() }
              { this.handleFilterGenrePlaylist() }
              { this.handleShowSongGenres() }
              { this.handleShowPlayListSongs() }
              { !isGenre ? <BackToHome clickToHome={this.clickToHome} /> : '' }
            </div>

          </div>

        </div>
      );
    }
}

App.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const songs = Songs.find({}).fetch()
  return {
    songs
  };
}, App);
