import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const BackToHome = ({clickToHome}) => {
    return (
      <div className="home-button">
        <button id="home-btn" type="button" className="btn btn-secondary" onClick={clickToHome}>Home</button>
      </div>
    )
}

export default BackToHome;
