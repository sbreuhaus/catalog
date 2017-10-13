import React from 'react';

const AltMixes = (props) => {
  return(
    <ul>
      {props.altMixes.map(mix => <li>{mix.name}</li>)}
    </ul>
  )
}

export default AltMixes;
