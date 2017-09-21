import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const BackToHome = ({clickToHome}) => {
    return (
      <div className="home-button" onClick={clickToHome}>
        <div className="play-button" type="button"><span className="fa fa-home fa-3x"></span></div>
      </div>
    )
}

export default BackToHome;
