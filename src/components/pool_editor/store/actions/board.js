import api from '@/lib/api';
import { getCurrentState } from '@/lib/state_helper';
import { selectCard } from './selection';
import { parseDeck } from '@/lib/parse_deck';

export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const setWindowSize = dimensions => (dispatch, getState) => {
  dispatch({ 
    type: SET_WINDOW_SIZE,
    dimensions,
    settingsExpanded: (getState().present.settings || {}).common.expanded
  });
};

export const CARD_DRAG_BEGIN = 'CARD_DRAG_BEGIN';
export const cardDragBegin = (cardId, stackId, originalPosition) => {
  return { 
    type: CARD_DRAG_BEGIN,
    cardId,
    stackId,
    originalPosition,
    undoable: true
  };
};

const DRAG_DELTA_CLICK_THESHOLD = 5;
export const CARD_DRAG_END = 'CARD_DRAG_END';
export const cardDragEnd = (card, stackId, dragDelta, metaHeld, shiftHeld) => (dispatch, getState) => {
  const { board, selection, settings } = getCurrentState(getState().present);

  const { originalPosition } = board.dragDrop;

  const dragDistance = Math.sqrt(dragDelta.x * dragDelta.x + dragDelta.y * dragDelta.y);
  if (dragDistance < DRAG_DELTA_CLICK_THESHOLD) {
    dispatch(selectCard(card, stackId, metaHeld, shiftHeld, { dragEnd: true }));
  }
  
  dispatch({ 
    type: CARD_DRAG_END,
    dragPosition: {
      top: originalPosition.top + dragDelta.y,
      left: originalPosition.left + dragDelta.x
    },
    filters: settings.filters,
    selectedCardIds: selection.selectedIds || [],
    undoable: true
  });
};

export const SWITCH_BOARDS = 'SWITCH_BOARDS';
export const switchBoards = (board) => {
  return {
    type: SWITCH_BOARDS,
    selectedBoard: board,
    undoable: true
  };
};

export const MOVE_CARDS_BETWEEN_BOARDS = 'MOVE_CARDS_BETWEEN_BOARDS';
export const moveCardsBetweenBoards = boardType => (dispatch, getState) => {
  const { board, selection } = getCurrentState(getState().present);
  const stackIdsAndCards = selection.selectedIds.map((selectedId) => {
    for (const stack of Object.values(board.stacks)) {
      const card = Object.values(stack.cards).find(card => card.id === selectedId);
      if (card) {
        return [stack.id, card];
      }
    }
  });

  if (stackIdsAndCards.length) {
    dispatch({
      type: MOVE_CARDS_BETWEEN_BOARDS,
      boardType,
      stackIdsAndCards,
      undoable: true
    });
  }
};

export const SET_CARD_DEPENDENCIES = 'SET_CARD_DEPENDENCIES';
export const GET_CARDS_FROM_EXPORT = 'GET_CARDS_FROM_EXPORT';
export const getCardsFromExport = (primaryCards, builtCards = '', previousPoolCards = '') => {
  return (dispatch, getState) => {
    const { present } = getState();

    const cards = parseDeck(primaryCards, builtCards, previousPoolCards);
    dispatch({
      type: GET_CARDS_FROM_EXPORT,
      cards: cards,
      previousMarket: [] // TODO
    });

    // TODO
    // dispatch({ 
    //   type: SET_CARD_DEPENDENCIES,
    //   cardDependencies: response.data.dependencyCards
    // });

    dispatch({
      type: SET_WINDOW_SIZE,
      dimensions: present.board.mainBoard.dimensions
    });
  };
};

export const ADD_CARDS = 'ADD_CARDS';
export const addCards = (cards) => {
  if (!(cards instanceof Array)) {
    cards = [cards];
  }

  return {
    type: ADD_CARDS,
    cards,
    undoable: true
  };
};
