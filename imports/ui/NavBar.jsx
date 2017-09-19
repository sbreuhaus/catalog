import React from 'react';
//import {logo} from '../../public/myLogos';
import ReactSVG from 'react-svg';

const NavBar = ({clickToHome}) => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#" onClick={clickToHome}>
            <ReactSVG
              path="../../ATT.svg"
              className="example"
              style={{ width: 32 }}
              />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
