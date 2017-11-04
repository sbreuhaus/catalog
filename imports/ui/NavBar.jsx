import React from 'react';
import MusicPlayer from './MusicPlayer.jsx';
//import {logo} from '../../public/myLogos';
import ReactSVG from 'react-svg';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top navbar-att">
      <div className="container">
        <div className="row" style={{width: '100%'}}>
          <div className=" col-sm-12 col-md-6 col-lg-6 navbar-logos">
            <div className="att-home" onClick={!props.isGenre ? props.clickToHome : ''}>
              <ReactSVG
                path="../../ATT.svg"
                className="logo-main"
                style={{ width: 32 }}
              />
            </div>
            <div id="powered">AT&T MicroCatalog <span className="fa fa-registered fa-lg"/><br/>by Man Made Music</div>
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
