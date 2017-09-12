import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Genre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idKey: this.props.unique.toString()
    }
  }

  componentDidMount(){
    console.log("key", this.props.unique);

  }

  render() {
    let idKey = `genre${this.state.idKey}`;
    return (
      <li className="grid-div-genre" id={idKey} onClick={this.props.clickGenre}>
        <p>{this.props.genre}</p>
      </li>
    );
  }
}
