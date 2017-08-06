import React, { Component } from 'react';

export default class PlayList extends Component {
  render() {
    return (
      <div className="col-md-2 col-xs-6 grid-div" onClick={this.props.clickPlaylist}>
        <p>{this.props.playList}</p>
      </div>
    );
  }
}
