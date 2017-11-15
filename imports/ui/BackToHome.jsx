import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const BackToHome = ({clickToHome}) => {
    return (
      <div className="home-button" onClick={clickToHome}>
        <div className="btn btn-default btn-lg" type="button">Home</div>
      </div>
    )
}

export default BackToHome;
