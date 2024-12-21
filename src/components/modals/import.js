import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import { Tab } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-text';


const ImportModal = ({
  builtText,
  previousPoolText,
  primaryText,
  onBuiltChange,
  onPreviousPoolChange,
  onPrimaryChange,
  onHide,
  onSubmit,
  show
}) => {
  const paneConfig = [
    {
      name: 'Pool',
      value: primaryText,
      onChange: onPrimaryChange,
      showUpload: true
    },
    {
      name: 'Previous Build (Optional)',
      value: builtText,
      onChange: onBuiltChange,
      showDownload: true,
      built: true
    },
    {
      name: 'Previous Pool (Optional)',
      value: previousPoolText,
      onChange: onPreviousPoolChange,
      showDownload: true,
      built: false
    }
  ];

  const tabPane = (title, value, onChange) => {
    const tabContent = () => {
      return (
        <Tab.Pane>
          <AceEditor
            mode="text"
            theme="github"
            onChange={onChange}
            value={value}
            placeholder="Paste from Eternal export..."
            width="100%"
          />
        </Tab.Pane>
      );
    };

    return {
      menuItem: title,
      render: tabContent
    };
  };

  const panes = useMemo(() => {
    return paneConfig.map((pane) => {
      return tabPane(pane.name, pane.value, pane.onChange);
    });
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Import from Eternal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab 
          panes={panes}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ImportModal.propTypes = {
  builtText: PropTypes.string,
  previousPoolText: PropTypes.string,
  primaryText: PropTypes.string,
  show: PropTypes.bool,
  onBuiltChange: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onPreviousPoolChange: PropTypes.func.isRequired,
  onPrimaryChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ImportModal;