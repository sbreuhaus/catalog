import React from 'react';

const SongMeta = (props) => {
  return (
    <ul className="li-last">
      <li>
        Genre:  <span>{props.song.genre}</span>
      </li>
      <li>
        Description: <span>{props.song.description}</span>
      </li>
      <li>
        Notable Intruments:  <span>{props.song.notable_instr}</span>
      </li>
      <li>
        Potential Uses:  <span>{props.song.potential_uses}</span>
      </li>
      <li>
        Tags:  <span>{props.song.other_tags}</span>
      </li>
      <li>
        For more info about this track please contact Ryan Hamilton at ryan@manmademusic.com
      </li>
    </ul>
  )
}

export default SongMeta;
