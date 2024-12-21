import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Portal } from 'semantic-ui-react';

import { BoardTypes } from '@/lib/board_types';

import _ from 'lodash';

const ContextMenu = ({ left, onClose, onMoveCards, selectedBoard, top }) => {
  const style = {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top,
    left,
    zIndex: 100
  };
  
  return (
    <Portal
      onClose={onClose}
      open
    >
      <div style={style}>
        <Menu vertical>
          {Object.values(BoardTypes).map((boardType) => {
            if (boardType !== selectedBoard) {
              return (
                <Menu.Item
                  key={boardType}
                  name="move-card"
                  onClick={() => onMoveCards(boardType)}
                >
                  Move to {_.capitalize(boardType)}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </div>
    </Portal>
  );
};

ContextMenu.propTypes = {
  left: PropTypes.number,
  selectedBoard: PropTypes.string,
  top: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onMoveCards: PropTypes.func.isRequired
};

export default ContextMenu;
