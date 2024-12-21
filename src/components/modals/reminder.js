import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

const ReminderModal = ({ onHide, show, text }) => {
  return (
    <Modal
      className="reminder-modal"
      show={show}
      onHide={onHide}
    >
      <Modal.Body>{text}</Modal.Body>
    </Modal>
  );
};

ReminderModal.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
  onHide: PropTypes.func.isRequired
};

export default ReminderModal;