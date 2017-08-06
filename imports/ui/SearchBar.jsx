import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return(
      <div className="input-group padding-top">
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button">Search</button>
        </span>
        <input type="text" className="form-control" placeholder="Search for..." onChange={this.props.handleSearch}></input>
      </div>
    )
  }
}
