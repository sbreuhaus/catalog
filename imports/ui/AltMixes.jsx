import React from 'react';
import ReactSVG from 'react-svg';

// const AltMixes = (props) => {
//   return (
//     <li className="list-group-item song">
//       {props.altMixes.map(mix => <span>{mix.name}</span>)}
//     </li>
//   );
// };
//
// export default AltMixes;

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class AltMixes extends React.Component {
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
  };
  render() {
    return (
      <div>
        <ul>
          <div className="alt-mix" onClick={this.openModal}>{this.props.altMixes[0].name}</div>
        </ul>

        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader className='modal-header'>
            <ModalClose onClick={this.hideModal} />
              <div className="modal-header-logo-title">
                <ReactSVG
                  className='modal-att-logo'
                  path="../../ATT.svg"
                  style={{ width: 32 }}
                />
              <ModalTitle className='modal-title'>{this.props.altMixes[0].name}</ModalTitle>
              </div>
          </ModalHeader>
          <ModalBody className='modal-body'>
            <ul className='li-last'>
              <li>Genre:<span>{this.props.altMixes[0].genre}</span></li>
              <li>Description:<span>{this.props.altMixes[0].description}</span></li>
              <li>Notable Instruments:<span>{this.props.altMixes[0].notable_instr}</span></li>
              <li>Potential Uses:<span>{this.props.altMixes[0].potential_uses}</span></li>
              <li>Tags:<span>{this.props.altMixes[0].other_tags}</span></li>
              <li>Sponsorship:<span>{this.props.altMixes[0].sponsorship}</span></li>
            </ul>
          </ModalBody>
          <ModalFooter className='modal-footer'>
            <button className='btn btn-default modal-close' onClick={this.hideModal}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AltMixes;
