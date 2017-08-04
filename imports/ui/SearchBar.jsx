import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return(
      <div className="input-group">
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Go!</button>
        </span>
        <input type="text" className="form-control" placeholder="Search for..."></input>
      </div>
    )
  }
}
