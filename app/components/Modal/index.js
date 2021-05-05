/**
 *
 * Modal
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Modal(props) {
  return <div className="modal active">
  <div className="backdrop" onClick={props.onClose}></div>
  <div className="content">
    {props.children}
  </div>
</div>;
}

Modal.propTypes = {};

export default Modal;
