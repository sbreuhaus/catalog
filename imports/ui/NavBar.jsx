import React from 'react';
import MusicPlayer from './MusicPlayer.jsx';
//import {logo} from '../../public/myLogos';
import ReactSVG from 'react-svg';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header navbar-att" style={{width: '100%'}}>
          <div className="col-md-4 navbar-logos">
            <ReactSVG
              path="../../ATT.svg"
              className="logo-main"
              style={{ width: 32 }}
              />
            <div id="powered">AT&T Microcatalog<br/> powered by</div>
            <ReactSVG
              path="../../Horizontal_Logo_Inverted.svg"
              className="mmm-logo"
              style={{ width: 200 }}
              />
          </div>
            {props.showMusicPlayer()}
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
