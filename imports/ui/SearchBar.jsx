import React from 'react';

const SearchBar = (props) => {
    return (
      <div className="form-group padding-top">
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
