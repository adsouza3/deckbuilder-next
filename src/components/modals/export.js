import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const ExportModal = ({ onHide, onSave, onWarcry, show, value }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Export Deck</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AceEditor
          mode="text"
          theme="github"
          readOnly
          value={value}
          placeholder="Paste from Eternal export..."
          width="100%"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="secondary" onClick={onWarcry}>
          <img className="warcry-icon" src="https://eternalwarcry.com/images/logo.png" />
        </Button>
        <Button variant="primary" onClick={() => navigator.clipboard.writeText(value)}>
          Export to Clipboard
        </Button>
        <Button variant="info" onClick={onSave}>
          <FontAwesomeIcon icon={faUpload} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ExportModal.propTypes = {
  show: PropTypes.bool,
  value: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onWarcry: PropTypes.func.isRequired
};

export default ExportModal;