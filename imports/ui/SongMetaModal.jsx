import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class SongMetaModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
    document.body.classList.remove('modal-open');
  };

  renderModal() {
    if (!this.state.isOpen) {
      return false;
    }

    return (
      <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <ModalHeader className='modal-header'>
          <ModalClose onClick={this.hideModal} />
          <div className="modal-header-logo-title">
          </div>
          <div className="modal-header-logo-title">
          <ModalTitle className='modal-title'>{this.props.song.name}</ModalTitle>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ul className='li-last'>
            <li><span className="info">Genre: </span><span>{this.props.song.genre}</span></li>
            <li><span className="info">Description: </span><span>{this.props.song.description}</span></li>
            <li><span className="info">Notable Instruments: </span><span>{this.props.song.notable_instr}</span></li>
            <li><span className="info">Potential Uses: </span><span>{this.props.song.potential_uses}</span></li>
            <li><span className="info">Tags: </span><span>{this.props.song.other_tags}</span></li>
            <li>For more information on this track, please contact Anjali Nair at anjali@manmademusic.com</li>
          </ul>
        </ModalBody>
        <ModalFooter className='modal-footer'>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    return (
      <div className="more-info-container">
        <div className="more-info" onClick={this.openModal}>
          <FontAwesome
             className="fa fa-plus fa-lg song-meta"
             aria-hidden="true"
             name="plus"
          />
         <span>More Info</span>
        </div>

        { this.renderModal() }

      </div>
    );
  }
}

export default SongMetaModal;
