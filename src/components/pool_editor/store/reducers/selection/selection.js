import {
  CLEAR_SELECTION,
  SELECT_CARD
} from '@/components/pool_editor/store/actions/selection';
import { OPEN_CONTEXT_MENU } from '@/components/pool_editor/store/actions/context_menu';
import * as settingsActions from '@/components/pool_editor/store/actions/settings';
import { MOVE_CARDS_BETWEEN_BOARDS, SWITCH_BOARDS } from '@/components/pool_editor/store/actions/board';
import { BoardTypes } from '@/lib/board_types';

const initialState = {
  anchorCardId: null,
  selectedIds: [],
  selectedBoard: BoardTypes.MAIN
};

export default boardType => (state = initialState, action) => {
  switch (action.type) {
  case SWITCH_BOARDS:
    return {
      ...state,
      selectedBoard: action.selectedBoard
    };
  default:
    if (boardType !== state.selectedBoard) {
      return state;
    }
  }

  switch (action.type) {
  case SELECT_CARD:
    return {
      ...state,
      anchorCardId: action.anchorCardId,
      anchorStackId: action.anchorStackId,
      selectedIds: action.selectedIds
    };
  case OPEN_CONTEXT_MENU:
    if (state.selectedIds.indexOf(action.card.id) === -1) {
      return {
        ...state,
        anchorCardId: action.card.id,
        selectedIds: [action.card.id]
      };
    }
    return state;
  case MOVE_CARDS_BETWEEN_BOARDS:
  case settingsActions.SET_FILTER_FACTIONS:
  case settingsActions.SET_FILTER_RARITIES:
  case settingsActions.SET_FILTER_COSTS:
  case settingsActions.SET_FILTER_TYPES:
  case settingsActions.SET_FILTER_BUILD_STATUSES:
  case settingsActions.SET_FILTER_SEARCH:
  case settingsActions.SET_SORTING_MODE:
  case settingsActions.SET_GROUPING_MODE:
  case CLEAR_SELECTION:
    return {
      ...initialState,
      selectedBoard: state.selectedBoard
    };
  default:
    return state;
  }
};
