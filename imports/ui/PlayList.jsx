import React, { Component } from 'react';

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idKey: this.props.unique.toString()
    }
  }

  render() {
    let idKey = `playlist${this.state.idKey}`
    return (
      <li id={idKey} className="grid-div-playlist overlay" onClick={this.props.clickPlaylist}>
        <p>{this.props.playList}</p>
      </li>
    );
  }
}
