import React from 'react';
import * as ReactDOM from 'react-dom';

import './Modal.css';



const ModalComponent = props => {

  return (
    <div className="a">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal__content">{props.children}</div>
      <div className="modal__actions">
        <button onClick={props.onCancelModal}>
          Cancel
        </button>
        <button onClick={props.onAcceptModal}>
          Accept
        </button>
      </div>
    </div>
  )
}

const Modal = (props) => {
  const modal_root = document.getElementById('modal-root');

  return (
      <React.Fragment>
        {ReactDOM.createPortal(<ModalComponent title = {props.title} onCancelModal={props.onCancelModal} 
        onAcceptModal={props.onAcceptModal}>{props.children}</ModalComponent>,
        modal_root
        )}
      </React.Fragment>
  )
}

export default Modal;
