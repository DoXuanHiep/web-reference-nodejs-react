import React from 'react';
import * as ReactDOM from 'react-dom';

import './Backdrop.css';

const BackdropComponent = props => {
  return (
      <div
        className={['backdrop', props.open ? 'open' : ''].join(' ')}
        onClick={props.onClick}
      />
  )
}

const Backdrop = (props) => {
  const backdrop_root = document.getElementById('backdrop-root');

  return (
      <React.Fragment>
        {ReactDOM.createPortal(<BackdropComponent onClick = {props.onClose}/>,
        backdrop_root
        )}
      </React.Fragment>
  )
}
export default Backdrop;
