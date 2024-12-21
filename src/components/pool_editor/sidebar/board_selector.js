import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import { switchBoards } from '@/components/pool_editor/store/actions/board';

import { getCurrentState } from '@/lib/state_helper';
import { BoardTypes } from '@/lib/board_types';

export const BoardSelector = ({ selectedBoard, switchBoards }) => {

  return (
    <ToggleButtonGroup name="boardType">
      {Object.values(BoardTypes).map((boardType) => {
        const checked = selectedBoard === boardType;
        return (
          <ToggleButton
            id={`board-${boardType}`}
            checked={checked}
            variant={checked ? 'primary' : 'secondary'}
            key={boardType}
            name="boardType"
            onChange={() => switchBoards(boardType)}
          >
            {_.capitalize(boardType)}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

BoardSelector.propTypes = {
  selectedBoard: PropTypes.string.isRequired,
  switchBoards: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  switchBoards
};

const mapStateToProps = ({ present }) => {
  const { board } = getCurrentState(present);

  return {
    selectedBoard: board.selectedBoard,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardSelector);