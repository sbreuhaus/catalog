import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Genre extends Component {
  render() {
    return (
      <li className="col-xs-6 col-sm-4 col-md-3 col-lg-2 genre-div thumbnail" onClick={this.props.clickGenre}>
        <p className="">{this.props.genre}</p>
      </li>
    );
  }
}
