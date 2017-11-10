import React from 'react';
import MusicPlayer from './MusicPlayer.jsx';
//import {logo} from '../../public/myLogos';
import ReactSVG from 'react-svg';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="row">
          <div className="att-home col-md-1 col-sm-2 col-xs-2">
            <div onClick={!props.isGenre ? props.clickToHome : ''}>
              <ReactSVG
                path="../../ATT.svg"
                className="logo-main"
                style={{ width: 32 }}
              />
            </div>
          </div>
          <div className="col-md-11 col-sm-9 col-xs 9 mmm-player">
            <ReactSVG
              path="../../Horizontal_Logo_Inverted.svg"
              className="mmm-logo"
              style={{ width: 200 }}
            />
            {props.showMusicPlayer()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
