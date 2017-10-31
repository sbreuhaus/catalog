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
import MusicPlayer from './MusicPlayer';
import NavBar from './NavBar';
import SongMeta from './SongMeta';
import AccountsUIWrapper from './AccountsUIWrapper';
import ShowAllButton from './ShowAllButton';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGenre: true,
      isPlaylist: true,
      genre: '',
      playList: '',
      playing: false,
      songs: this.props.songs,
      searchMatches: '',
      matchedSongs: [],
      playerSong: undefined,
      songMeta: false,
      selectedUrl: undefined,
      songUrl: undefined,
      audioIsPlaying: false,
      sponsorshipSongs: undefined,
      audio: undefined,
      duration: undefined,
      songSlider: undefined,
      currentTime: undefined,
      showAllSongs: false,
      notAltMix: undefined,
      altMixes: undefined,
      sponsorAltMixes: undefined,
    }
    this.clickGenre = this.clickGenre.bind(this);
    this.clickPlaylist = this.clickPlaylist.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.DisplaySearchResults = this.DisplaySearchResults.bind(this);
  }

  componentDidMount() {
    const songs = this.state.songs;
    const sponsorAltMixes = [];
    const sponsorshipSongs = songs.filter((song) => {
      return song.sponsorship === 'yes';
    });
    const notAltMix = songs.filter((song) => {
      return song.parent_track === '';
    })
    const altMixes = songs.filter((song) => {
      return song.parent_track.length;
    })
    for (var i = 0; i < songs.length; i++) {
      if (songs[i].sponsorship === 'yes' && songs[i].parent_track.length ){
        sponsorAltMixes.push(songs[i]);
      }
    }
    //window.addEventListener('scroll', this.handleScroll);
    // let w = window,
    //   d = document,
    //   e = d.documentElement,
    //   g = d.getElementsByTagName('body')[0],
    //   x = w.innerWidth || e.clientWidth || g.clientWidth,
    //   y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    //w.addEventListener('scroll', this.handleScroll);
    //console.log(x + ' × ' + y);
    // const body = document.querySelector('body')
    const audio = document.getElementById('att_player');
    const duration = document.querySelector('.duration');
    const songSlider = document.getElementById('songSlider');
    const currentTime = document.getElementById('currentTime');
    this.setState({
      sponsorshipSongs, audio, duration, songSlider, currentTime, altMixes, notAltMix, sponsorAltMixes,
    });
  }

  componentWillReceiveProps(nextProps) { // Meteor createContainer sends data in chunks.  This receives it.
    const songs = nextProps.songs;
    const sponsorAltMixes = [];
    const sponsorshipSongs = songs.filter((song) => {
      return song.sponsorship === 'yes';
    });
    const notAltMix = songs.filter((song) => {
      return song.parent_track === '';
    })
    const altMixes = songs.filter((song) => {
      return song.parent_track.length;
    })
    for (var i = 0; i < songs.length; i++) {
      if (songs[i].sponsorship === 'yes' && songs[i].parent_track.length ){
        sponsorAltMixes.push(songs[i]);
      }
    }
    this.setState({
      songs: nextProps.songs, sponsorshipSongs, altMixes, notAltMix, sponsorAltMixes
    });
  }

  audioIsPlaying() {
    let audio = this.state.audio;
    //debugger;
    if (audio) {
      console.log('audio is NOW playing');
      console.log('App.state.audioIsPlaying', this.state.audioIsPlaying);
      this.setState({ audioIsPlaying: !this.state.audioIsPlaying })
    }
  }

  clickGenre(e) {
    this.handleSetGenre(e.target.innerHTML.replace(/<\/?[^>]+(>|$)/g, '')); //strip html tags
    this.toggleView();
  }

  toggleShowAllSongs = () => {
    this.setState({ showAllSongs: !this.state.showAllSongs, isGenre: !this.state.isGenre });
  }

  showAllSongs = () => {
    if (this.state.showAllSongs) {
      const songs = this.state.songs;
      console.log('songs inside of showAllSongs', songs);
      return (
        <ul className="list-group">
          <h1 className="which-alignment">All Songs</h1>
          { songs.map((song, index) => (
            <Song
              song={song}
              key={index}
              songUrl={this.state.songUrl}
              isGenre={this.state.isGenre}
              convertTime={this.convertTime}
              playAudio={this.playAudio}
              showDuration={this.showDuration}
              upDateSongSliderTwo={this.upDateSongSliderTwo}
              isPlaying={this.isPlaying}
              isPaused={this.isPaused}
              playing={this.state.playing}
              audio={this.state.audio}
            />)
          ) }
        </ul>
      );
    }
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
      songUrl: '',
      searchMatches: '',
      matchedSongs: [],
      showAllSongs: false,
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
      const altMixes = this.state.altMixes;
      let filtered = [];
      const filterGenre = this.state.genre;
      const sponsorship = this.state.sponsorshipSongs;

      for (let i = 0; i < filterSongs.length; i++) {
        const song = filterSongs[i];
        const genre = filterSongs[i].genre;

        if (genre === filterGenre && genre !== '' && song.parent_track === '') {
          filtered.push(song);
        }
      }

      const altMixesFilter = (song) => altMixes.filter(mix => mix.parent_track === song.name)
      return (
        <ul className="list-group">
          <h1 className="which-alignment">{filterGenre}</h1>
          { filtered.map((song, index) => (
            <Song
              altMixes={altMixesFilter(song)}
              genre={filterGenre}
              matchedSongs={this.state.matchedSongs}
              song={song}
              key={index}
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
              audio={this.state.audio}
            />)
          ) }
        </ul>
      );
    }
  }

    handleShowPlayListSongs() {
      if (!this.state.isGenre) {
        const filterSongs = this.state.songs;
        const altMixes = this.state.altMixes;
        let filtered = [];
        const filterPlaylist = this.state.playList;
        const sponsorship = this.state.sponsorshipSongs;
        if (filterPlaylist === 'Anthem/Sponsorship Package') {
          //console.log('sponsorship inside if', sponsorship);
          const arr = sponsorship.filter(obj => obj.parent_track === '')
          filtered = filtered.concat(arr);
          //console.log('yes altmix', sponsorAltMix);
        } else {
          for (let i = 0; i < filterSongs.length; i++) {
            const song = filterSongs[i];
            const playlist = filterSongs[i].playlist;

            if (playlist === filterPlaylist && playlist !== '' && song.parent_track === '') {
              filtered.push(song);
            }
          }
        }
        const altMixesFilter = (song) => altMixes.filter(mix => mix.parent_track === song.name)
        return (
          <ul className="list-group">
            <h1 className="which-alignment">{filterPlaylist}</h1>
            { filtered.map((song, index) => (
              <Song
                altMixes={altMixesFilter(song)}
                playlist={filterPlaylist}
                matchedSongs={this.state.matchedSongs}
                song={song}
                key={index}
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
                audio={this.state.audio}
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
            //console.log('key', key);
            //console.log("YO", songs[i][key], searchMatches);
            //console.log(songs[i][key].toString().toLowerCase().indexOf(searchMatches));
            if (songs[i][key].toString().toLowerCase().indexOf(searchMatches)!=-1) {

              if (!this.itemExists(matches, songs[i])) {
                matches.push(songs[i]);
                //console.log('matches', matches);
              }
            }
          }
        }
        this.setState({ matchedSongs: matches });
      });
    }

    showMusicPlayer = () => {
      const songUrl = this.state.songUrl;
      return (
        <MusicPlayer
          isGenre={this.state.isGenre}
          audio={this.state.audio}
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
      if (this.state.searchMatches && this.state.isGenre) {
        return (
          <div>
            { matchedSongs.map((song, index) => (
              <Song
                song={song}
                key={index}
                setUrl={this.handleSetUrl}
                matchedSongs={this.state.matchedSongs}
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
                audio={this.state.audio}
              />))
            }
          </div>
        );
      }
    }

    showDuration = () => {
      const sound = this.state.audio;
      const duration = this.state.duration;
      const songSlider = this.state.songSlider;
      const d = Math.floor(sound.duration);
      duration.textContent = this.convertTime(d);
      songSlider.setAttribute('max', d);
    }

    upDateSongSliderTwo = () => {
      const sound = this.state.audio;
      if (sound.src) {
        const songSlider = this.state.songSlider;
        const currentTime = this.state.currentTime;
        const c = Math.round(sound.currentTime);
        songSlider.value = sound.currentTime;
        currentTime.textContent = this.convertTime(c);
      } else {
        return;
      }
    }

    seekSong = () => {
      const sound = this.state.audio;
      const songSlider = this.state.songSlider;
      const currentTime = this.state.currentTime;
      sound.currentTime = songSlider.value;
      currentTime.textContent = this.convertTime(sound.currentTime)
    }

    playAudioNav = (e) => {
      e.preventDefault();
      this.isPlaying()
      // const showDuration = this.props.showDuration;
      // debugger;
      // console.log('playAudio');
      const sound = this.state.audio;
      // sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
      // const intervalId = setInterval(showDuration, 2000);
      //
      // this.setState({ intervalId: intervalId });
      //debugger;
      sound.play();
    }

    pauseAudioNav = (e) => {
      e.preventDefault();
      this.isPaused()
      const sound = this.state.audio;
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

    playOrPause = () => {
      if (songIsPlaying === false || sound.src !== `http://www.manmademusic.com/files/att_microcatalog/resources/${that.props.song.url}.mp3`) {
        return (
          <div className="play-button" type="button" onClick={that.playAudio}>
            <span className="fa fa-play fa-lg" />
          </div>
        )
      } else if (sound.src === `http://www.manmademusic.com/files/att_microcatalog/resources/${that.props.song.url}.mp3`) {
        return (
          <div className="pause-button" type="button" onClick={that.pauseAudio}>
            <span className="fa fa-pause fa-lg" />
          </div>
        )
      }
    }

    render() {
      const isGenre = this.state.isGenre;
      //console.log('this.handleScroll', this.handleScroll);

      return (
        <div>
          <NavBar
            isPlaying={this.isPlaying}
            isGenre={isGenre}
            clickToHome={this.clickToHome}
            showMusicPlayer={this.showMusicPlayer}
          />
        <div className="container ">
            <div className="row">
              {this.state.isGenre ?
                <SearchBar handleSearch={this.handleSearch} />
                : ''}
            </div>

            <div className="row">
              {this.state.showAllSongs === false && this.state.isGenre && this.state.searchMatches === '' ?
                <ShowAllButton
                  toggleShowAllSongs={this.toggleShowAllSongs}
                /> : ''}
              { this.showAllSongs() }
              { this.DisplaySearchResults() }
              { this.handleFilterGenrePlaylist() }
              { this.handleShowSongGenres() }
              { this.handleShowPlayListSongs() }
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
  const songs = Songs.find({}).fetch();
  return {
    songs
  };
}, App);
