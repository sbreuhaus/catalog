import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Genre extends Component {
  render() {
    return (
      <li className="grid-div-genre" onClick={this.props.clickGenre}>
        <p>{this.props.genre}</p>
      </li>
    );
  }
}
