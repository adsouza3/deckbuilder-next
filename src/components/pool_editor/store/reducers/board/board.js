import { produce } from 'immer';
import uuid from 'short-uuid';

import {
  ADD_CARDS,
  CARD_DRAG_BEGIN,
  CARD_DRAG_END,
  GET_CARDS_FROM_EXPORT,
  SET_WINDOW_SIZE,
  SWITCH_BOARDS
} from '@/components/pool_editor/store/actions/board';
import { SET_GROUPING_MODE } from '@/components/pool_editor/store/actions/settings';
import { MOVE_CARDS_BETWEEN_BOARDS } from '@/components/pool_editor/store/actions/board';
import { applyGrouping } from '@/lib/card_group';
import { applyFilters } from '@/lib/card_filter';
import { initializeStacksAndSigils } from '@/lib/board_initialization';
import { BoardTypes } from '@/lib/board_types';
import { getCards } from '@/lib/state_helper';

export const initialState = {
  cardSpacing: 30,
  cardHeight: 240,
  selectedBoard: BoardTypes.MAIN,
  stackRows: 1,
  stackCols: 1,
  stacks: { //TODO a real initial state
    '0:0': {
      id: '0:0',
      rowIndex: 0,
      colIndex: 0,
      cards: {},
      position: {
        top: 0,
        left: 0
      }
    }
  }
};

export default boardType => (state = initialState, action) => {
  const selected = boardType === state.selectedBoard;

  switch (action.type) {
  case SWITCH_BOARDS:
    return {
      ...state,
      selectedBoard: action.selectedBoard
    };
  case SET_WINDOW_SIZE: {
    const stacks = {};
    const stackDimensions = {
      height: action.dimensions.height,
      width: Math.floor(action.dimensions.width * (action.settingsExpanded ? 0.8 : 1.0))
    };

    Object.values(state.stacks).forEach((stack) => {
      const position = getStackPosition(stackDimensions, stack, state.stackRows, state.stackCols);
      stacks[stack.id] = {
        ...stack,
        position
      };
    });

    return {
      ...state,
      dimensions: stackDimensions,
      stacks
    };
  }
  case MOVE_CARDS_BETWEEN_BOARDS: {
    const { stackIdsAndCards } = action;

    return produce(state, (draft) => {
      for (const [stackId, card] of stackIdsAndCards) {
        if (selected) {
          delete draft.stacks[stackId].cards[card.id];
        } else if (action.boardType === boardType) {
          draft.stacks['0:0'].cards[card.id] = card;
        }
      }
    });
  }
  case GET_CARDS_FROM_EXPORT:
    return produce(state, (draft) => {
      if (boardType === BoardTypes.MAIN) {
        const [stacks] = initializeStacksAndSigils(action.cards);
        draft.stacks = stacks;
      } else {
        Object.keys(draft.stacks).forEach(stackId => draft.stacks[stackId].cards = {});
      }
    });
  case ADD_CARDS:
    return produce(state, (draft) => {
      if (boardType === BoardTypes.MAIN) {
        action.cards.forEach((card) => {
          const cardId = uuid.generate();
          draft.stacks['0:0'].cards[cardId] = {
            ...card,
            id: cardId
          };
        });
      }
    });
  default:
    if (!selected) {
      return state;
    }
  }

  switch (action.type) {
  case CARD_DRAG_BEGIN:
    return { 
      ...state,
      dragDrop: {
        cardId: action.cardId,
        stackId: action.stackId,
        originalPosition: action.originalPosition
      } 
    };
  case CARD_DRAG_END: {
    const newStackId = closestStackId(action.dragPosition, state.stacks, state.cardSpacing, action.filters);
    if (newStackId === state.dragDrop.stackId) {
      return state;
    }
  
    const newStacks = moveCardsBetweenStacks(state.stacks, action.selectedCardIds, newStackId);

    return { 
      ...state,
      stacks: newStacks,
      dragDrop: {}
    };
  }
  case SET_GROUPING_MODE: {
    const cards = getCards(state);
    const groupedCards = applyGrouping(cards, action.mode);

    const stacks = {};
    groupedCards.forEach((group, i) => {
      const stackId = `${0}:${i}`;
      stacks[stackId] = {
        id: stackId,
        rowIndex: 0,
        colIndex: i,
        cards: Object.fromEntries(group.map(card => [card.id, card])),
        position: {
          top: 0,
          left: 0
        }
      };
    });

    const stackDimensions = {
      height: window.innerHeight,
      width: Math.floor(window.innerWidth * action.boardWidthCoefficient)
    };

    Object.values(stacks).forEach((stack, i) => {
      let position = getStackPosition(stackDimensions, stack, 2, groupedCards.length);
      stacks[stack.id] = {
        ...stack,
        position
      };

      const secondStackId = `${1}:${i}`;
      const secondStack = {
        id: secondStackId,
        rowIndex: 1,
        colIndex: i,
        cards: {},
        position: {
          top: 0,
          left: 0
        }
      };
      position = getStackPosition(stackDimensions, secondStack, 2, groupedCards.length);
      stacks[secondStackId] = {
        ...secondStack,
        position
      };
    });

    return {
      ...state,
      stacks,
      stackRows: 2,
      stackCols: groupedCards.length
    };
  }
  default:
    return state;
  }
};

export const getStackPosition = (dimensions, stack, stackRows, stackCols) => {
  const { height, width } = dimensions || {};
  return {
    top: Math.floor(stack.rowIndex * (height || 0) / stackRows),
    left: Math.floor(stack.colIndex * (width || 0) / stackCols)
  };
};

const STACK_DROP_TRESHOLD = 150;
const closestStackId = (position, stacks, cardSpacing, filters) => {
  let bestId;
  let bestDiff = Number.MAX_SAFE_INTEGER;

  Object.values(stacks).forEach((stack) => {
    const xDiff = stack.position.left - position.left;

    const filteredCards = applyFilters(Object.values(stack.cards), filters);
    const stackHeight = Math.max(0, filteredCards.length - 1) * cardSpacing;
    const yDiff = Math.min(
      Math.abs(stack.position.top - position.top),
      Math.abs(stack.position.top + stackHeight - position.top)
    );

    const trueDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (trueDiff < bestDiff) {
      bestDiff = trueDiff;
      bestId = stack.id;
    }
  });

  return bestDiff < STACK_DROP_TRESHOLD ?  bestId : null;
};

const moveCardsBetweenStacks = (stacks, cardIds, newStackId) => {
  return produce(stacks, (draft) => {
    for (const cardId of cardIds) {
      const oldStackId = Object.keys(draft).find((stackId) => {
        return Object.keys(draft[stackId].cards).indexOf(cardId) !== -1;
      });

      if (!oldStackId || !newStackId || newStackId === oldStackId) {
        return draft;
      }
  
      const card = draft[oldStackId].cards[cardId];
      draft[newStackId].cards[cardId] = card;
      delete draft[oldStackId].cards[cardId];
    }
  });
};