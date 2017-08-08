import React, { Component } from 'react';

export default class PlayList extends Component {
  render() {
    return (
      <li className="col-xs-6 col-sm-4 col-md-3 col-lg-2 play-list-div thumbnail" onClick={this.props.clickPlaylist}>
        <p>{this.props.playList}</p>
      </li>
    );
  }
}
