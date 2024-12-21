import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import { Tab } from 'semantic-ui-react';

import Composition from './composition';
import Consistency from './consistency';

const StatsModal = ({ onHide, show }) => {
  const tabPane = (title, Content) => {
    const tabContent = () => {
      return (
        <Tab.Pane>
          <Content />
        </Tab.Pane>
      );
    };

    return {
      menuItem: title,
      render: tabContent
    };
  };

  return (
    <Modal
      dialogClassName="stats-modal"
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deck Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab 
          panes={[
            tabPane('Composition', Composition),
            tabPane('Consistency', Consistency),
          ]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StatsModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired
};

export default StatsModal;