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
      <li className="grid-div-playlist" id={idKey} onClick={this.props.clickPlaylist}>
        <p>{this.props.playList}</p>
      </li>
    );
  }
}
