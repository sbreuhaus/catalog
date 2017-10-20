import React from 'react';

const ShowAllButton = ({toggleShowAllSongs}) => {
  return (
    <button className="btn btn-lg show-all" onClick={toggleShowAllSongs}>Show All Songs</button>
  );
};

export default ShowAllButton;
