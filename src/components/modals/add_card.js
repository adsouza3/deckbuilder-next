import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

import api from '@/lib/api';

import './styles.scss';

const cards = {};

const AddCardModal = ({ show, onAddCard, onHide, searchPath }) => {
  const [selection, setSelection] = useState(null);

  const loadOptions = (query, callback) => {
    api.get(`${searchPath}.json`, {
      params: { query }
    }).then((response) => {
      response.data.forEach(card => cards[card.id] = cards[card.id] || card);
      callback(response.data.map(card => ({ value: card.id, label: card.name })));
    });
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  };

  const handleSelectionChange = (selectedOption) => {
    setSelection(selectedOption.value);
  };

  const handleAddCard = () => {
    const card = cards[selection];
    if (card) {
      onAddCard(card);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Import from Eternal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AsyncSelect
          cacheOptions
          defaultValue
          loadOptions={loadOptions}
          onChange={handleSelectionChange}
          onInputChange={handleInputChange}
        />
        {selection && cards[selection] && (
          <div className="add-card-preview">
            <img 
              draggable="false"
              src={cards[selection].imageUrl}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" active={!!selection} onClick={handleAddCard}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddCardModal.propTypes = {
  searchPath: PropTypes.string.isRequired,
  show: PropTypes.bool,
  onAddCard: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired
};

const mapStateToProps = ({ present: { editor: { paths } } }) => {
  return { searchPath: paths.search };
};

export default connect(mapStateToProps)(AddCardModal);