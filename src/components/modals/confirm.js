import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'semantic-ui-react';

const ConfirmModal = ({ onCancel, onConfirm, open, text }) => {
  return (
    <Modal
      className="reminder-modal"
      open={open}
      onClose={onCancel}
    >
      <Modal.Content>{text}</Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" name="cancel" onClick={onCancel} />
        <Button content="Ok" name="delete" primary onClick={onConfirm} />
      </Modal.Actions>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmModal;