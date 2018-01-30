import React from 'react';

const SearchBar = (props) => {
    return (
      <div className="form-group col-md-8 col-sm-9 col-xs-8">
        <input
          type="text"
          className="form-control input-lg"
          placeholder="Search for titles, genres, tags, instrumentation etc."
          onChange={props.handleSearch}>
        </input>
      </div>
    )
}

export default SearchBar;
