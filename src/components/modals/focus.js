import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

import { camelize } from 'humps';

import { clearFocusedCard } from '@/components/pool_editor/store/actions/focus';

const FocusModal = ({ clearFocusedCard, dependencyCards, focus, sets }) => {
  if (!focus) {
    return null;
  }

  let cardSetDescription = '';
  if (sets && sets[focus.setNumber]) {
    cardSetDescription = `${sets[focus.setNumber]} [${focus.setNumber}]`;
  }

  return (
    <Modal
      className="focus-modal"
      show={!!focus}
      size="xl"
      onHide={clearFocusedCard}
    >
      <Modal.Body>
        <div className="focused-card">
          <img 
            className="focuscard-img"
            draggable="false"
            src={focus.imageUrl}
            height="100%"
          />
          {cardSetDescription}
        </div>
        <div className="focused-card-info">
          {(focus.abilities || []).length && (
            <div className="focused-card-abilities">
              {focus.abilities.map((ability) => {
                return <div className="focused-card-ability" key={ability.name}>
                  <b>{ability.name}: </b>
                  {ability.description}
                </div>;
              })}
            </div>
          )}
          <div className="focused-card-dependencies">
            {(focus.cardDependencyNames || []).map(camelize).map((name, i) => {
              const dependencyCard = dependencyCards[name];
              if (dependencyCard) {
                return (
                  <img 
                    className="dependency-card-img"
                    draggable="false"
                    key={i}
                    src={dependencyCard.imageUrl}
                  />
                );
              }
            })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

FocusModal.propTypes = {
  clearFocusedCard: PropTypes.func.isRequired,
  dependencyCards: PropTypes.object,
  focus: PropTypes.object,
  sets: PropTypes.object
};

const mapDispatchTopProps = {
  clearFocusedCard
};

const mapStateToProps = ({ present }) => {
  return {
    dependencyCards: present.dependencyCards,
    focus: present.focus,
    sets: present.board.sets
  };
};

export default connect(mapStateToProps, mapDispatchTopProps)(FocusModal);