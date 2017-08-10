import React from 'react';

const SongMeta = (props) => {
  return (

        <ul>
          <li>
            Genre:  {props.song.genre}
          </li>
          <li>
            Notable Intruments:  {props.song.notable_instr}
          </li>
        </ul>

  )
}

export default SongMeta;
