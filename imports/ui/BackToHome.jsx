import React, { Component } from 'react';

const BackToHome = ({clickToHome}) => {
    return <button id="home-btn" type="button" className="btn btn-secondary" onClick={clickToHome}>Home</button>
}

export default BackToHome;
