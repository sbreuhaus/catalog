import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Genre extends Component {
  render() {
    return (
      <div className="genre" onClick={this.props.clickGenre}>
        <p>{this.props.genre}</p>
      </div>
    );
  }
}
