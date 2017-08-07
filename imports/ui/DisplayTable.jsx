import React, { Component } from 'react';

export default class DisplayTable extends Component {
  render() {
    return (
      <div>
        <li><p>{this.props.song.name}</p></li>
      </div>
    );
  }
}
