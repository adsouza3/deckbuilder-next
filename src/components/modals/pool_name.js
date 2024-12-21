import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';

const PoolNameModal = ({ show, onHide, onSubmit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName('');
  }, [show]);

  return (
    <Modal
      className="pool-name-modal"
      show={show}
      onHide={onHide}
      onSubmit={onSubmit}
    >
      <Modal.Header closeButton>
        <Modal.Title>Pool Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          className="pool-name-input"
          label="Name:"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button disabled={!name} variant="primary" onClick={() => onSubmit(name)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PoolNameModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default PoolNameModal;