import _ from 'lodash';

import { applyFilters } from '@/lib/card_filter';
import { getCurrentState } from '@/lib/state_helper';
import { cardComparator } from '@/lib/card_sort';

export const SELECT_CARD = 'SELECT_CARD';
export const selectCard = (
  card,
  stackId,
  metaHeld, 
  shiftHeld,
  { dragEnd = false, dragStart = false }
) => (dispatch, getState) => {
  const { board, selection, settings } = getCurrentState(getState().present);
  let { anchorCardId, anchorStackId, selectedIds } = selection;

  if (metaHeld && anchorCardId && anchorStackId) {
    if (dragEnd) {
      return; 
    }

    if (selectedIds.indexOf(card.id) === -1) {
      selectedIds = [...selectedIds, card.id];
    } else {
      selectedIds = selectedIds.filter(id => id !== card.id);
      anchorCardId = selectedIds.length > 0 ? selectedIds[0] : null;
    }
  } else if (shiftHeld && anchorCardId && anchorStackId) {
    const anchorCard = board.stacks[anchorStackId].cards[anchorCardId];
    const actionCard = board.stacks[stackId].cards[card.id];
    const comparator = cardComparator(settings.sorting);

    let inRange;
    if (comparator(anchorStackId, stackId)(anchorCard, actionCard) < 0) {
      inRange = (card, cardStackId) => {
        return (
          comparator(anchorStackId, cardStackId)(anchorCard, card) <= 0 &&
          comparator(stackId, cardStackId)(actionCard, card) >= 0
        );
      };
    } else {
      inRange = (card, cardStackId) => {
        return (
          comparator(anchorStackId, cardStackId)(anchorCard, card) >= 0 &&
          comparator(stackId, cardStackId)(actionCard, card) <= 0
        );
      };
    }

    selectedIds = _.flatten(Object.keys(board.stacks).map((stackId) => {
      const filteredCards = applyFilters(Object.values(board.stacks[stackId].cards), settings.filters);
      return filteredCards.filter(card => inRange(card, stackId));
    })).map(card => card.id);
  } else {
    if (!dragStart || selectedIds.indexOf(card.id) === -1) {
      selectedIds = [card.id];
      anchorCardId = card.id;
      anchorStackId = stackId;
    }
  }
  dispatch({
    type: SELECT_CARD,
    anchorCardId,
    anchorStackId,
    selectedIds
  });
};

export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const clearSelection = () => {
  return {
    type: CLEAR_SELECTION
  };
};