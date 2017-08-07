import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return(
      <div className="input-group padding-top">
        <input type="text" className="form-control input-lg" placeholder="Search for..." onChange={this.props.handleSearch}></input>
      </div>
    )
  }
}
