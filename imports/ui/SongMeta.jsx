import React from 'react';

const SongMeta = (props) => {
  return (
    <ul className="li-last">
      <li>
        Genre:  {props.song.genre}
      </li>
      <li>
        Notable Intruments:  {props.song.notable_instr}
      </li>
      <li>
        Potential Uses:  {props.song.potential_uses}
      </li>
      <li>
        Tags:  {props.song.other_tags}
      </li>
      <li>
        For more info about this track please contact Ryan Hamilton at ryan@manmademusic.com
      </li>
    </ul>
  )
}

export default SongMeta;
