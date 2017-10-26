import React from 'react';
//import ReactSVG from 'react-svg';

// const AltMixes = (props) => {
//   const altMixes = props.altMixes;
//   const sound = props.sound;
//   return (
//     <div className="alt-mix-container">
//       <ul>
//         {altMixes.map((mix, index) =>
//           <li className="alt-mix-name">{mix.name}</li>
//         )}
//       </ul>
//     </div>
//   );
// };
//
// export default AltMixes;

// import {
//   Modal,
//   ModalHeader,
//   ModalTitle,
//   ModalClose,
//   ModalBody,
//   ModalFooter
// } from 'react-modal-bootstrap';

class AltMixes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      altMixes: this.props.altMixes
    };
  }
  playAudio = (e) => {
    e.preventDefault();
    const showDuration = this.props.showDuration;
    //debugger;
    console.log('playAudio');
    const sound = document.getElementById('att_player');
    sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${this.props.song.url}.mp3`;
    const intervalId = setInterval(showDuration, 2000);
    this.props.isPlaying();
    this.setState({ intervalId, songIsPlaying: true });
    //debugger;
    sound.play();
  }

  playAudio = (e) => {
    e.preventDefault();
    const showDuration = this.props.showDuration;
    //debugger;
    console.log('playAudio altmix');
    const sound = this.props.sound;
    sound.src = `http://www.manmademusic.com/files/att_microcatalog/resources/${mix.url}.mp3`;
    const intervalId = setInterval(showDuration, 2000);
    this.props.isPlaying();
    this.setState({ intervalId, songIsPlaying: true });
    //debugger;
    sound.play();
  }

  playOrPause = (mix) => {
    const sound = this.props.sound;
    console.log('heres a mix', mix);
    const songIsPlaying = this.props.songIsPlaying;

    //console.log('altMixes', altMixes);
    const mmmUrl = 'http://www.manmademusic.com/files/att_microcatalog/resources/';
    if (songIsPlaying === false && sound.src !== `${mmmUrl}${mix.url}.mp3`) {
      console.log('inforeach. sonIsPlaying is false');
      return (
        <div className="play-button" type="button" onClick={this.playAudio}>
          <span className="fa fa-play fa-lg" />
        </div>
      );
    } else if (sound.src === `${mmmUrl}${mix.url}.mp3`) {
      return (
        <div className="pause-button" type="button" onClick={console.log('pauseAudio')}>
          <span className="fa fa-pause fa-lg" />
        </div>
      );
    }

  }

  render() {
    const that = this;
    const sound = this.props.sound;
    //console.log('sound in altMixes', sound);
    const songIsPlaying = this.props.songIsPlaying;
    const altMixes = this.state.altMixes;
    //console.log('altMixes', altMixes);
    const mmmUrl = 'http://www.manmademusic.com/files/att_microcatalog/resources/';

    function download() {
      if (that.props.playlist === 'Anthem/Sponsorship Package') {
        return <a href={`${mmmUrl}${that.props.song.url}.mp3`} download><span className="fa fa-download fa-lg"></span></a>
      }
    }

    return (
      <div className="alt-mix-container">
        <ul>
          {altMixes.map((mix, index) =>
            <li key={index} className="alt-mix-name">
              { this.playOrPause(mix) }
              { download() }
              {mix.name}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default AltMixes;

// <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
//   <ModalHeader className='modal-header'>
//     <ModalClose onClick={this.hideModal} />
//       <div className="modal-header-logo-title">
//         <ReactSVG
//           className='modal-att-logo'
//           path="../../ATT.svg"
//           style={{ width: 32 }}
//         />
//       <ModalTitle className='modal-title'>{this.props.altMixes[0].name}</ModalTitle>
//       </div>
//   </ModalHeader>
//   <ModalBody className='modal-body'>
//     <ul className='li-last'>
//       <li>Genre:<span>{this.props.altMixes[0].genre}</span></li>
//       <li>Description:<span>{this.props.altMixes[0].description}</span></li>
//       <li>Notable Instruments:<span>{this.props.altMixes[0].notable_instr}</span></li>
//       <li>Potential Uses:<span>{this.props.altMixes[0].potential_uses}</span></li>
//       <li>Tags:<span>{this.props.altMixes[0].other_tags}</span></li>
//       <li>Sponsorship:<span>{this.props.altMixes[0].sponsorship}</span></li>
//     </ul>
//   </ModalBody>
//   <ModalFooter className='modal-footer'>
//     <button className='btn btn-default modal-close' onClick={this.hideModal}>
//       Close
//     </button>
//   </ModalFooter>
// </Modal>
