import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const BackToHome = ({clickToHome}) => {
    return (
      <div className="home-button">
        <FontAwesome className="fa fa-chevron-left" aria-hidden="true"></FontAwesome>
        <button id="home-btn" type="button" className="btn btn-secondary" onClick={clickToHome}>Home</button>
      </div>
    )
}

export default BackToHome;
