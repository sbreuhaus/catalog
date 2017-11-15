import React from 'react';

const ShowAllButton = ({toggleShowAllSongs}) => {
  return (
    <button className="btn btn-lg show-all" onClick={toggleShowAllSongs}>
      <div>All Songs</div>
    </button>
  );
};

export default ShowAllButton;
