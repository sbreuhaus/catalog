import React, { Component } from 'react';

export default class PlayList extends Component {
  render() {
    return (
      <li className="grid-div-playlist" onClick={this.props.clickPlaylist}>
        <p>{this.props.playList}</p>
      </li>
    );
  }
}
