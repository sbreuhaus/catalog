import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Genre extends Component {
  render() {
    return (
      <div className="col-md-2 col-xs-6 col-lg-2 col-sm-2 grid-div" onClick={this.props.clickGenre}>
        <p>{this.props.genre}</p>
      </div>
    );
  }
}
