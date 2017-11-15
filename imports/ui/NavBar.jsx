import React from 'react';
import MusicPlayer from './MusicPlayer.jsx';
//import {logo} from '../../public/myLogos';
import ReactSVG from 'react-svg';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="row">
          <div className="att-home col-md-6 col-xs-12">
            <div onClick={!props.isGenre ? props.clickToHome : ''}>
              <ReactSVG
                path="../../ATT.svg"
                className="logo-main"
                style={{ width: 32 }}
              />
            </div>
            <div className="current-song">{props.currentSong}</div>
          </div>
          <div className="col-md-6 col-xs-12 mmm-player">
            {props.showMusicPlayer()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;

// <ReactSVG
//   path="../../Horizontal_Logo_Inverted.svg"
//   className="mmm-logo"
//   style={{ width: 200 }}
// />
