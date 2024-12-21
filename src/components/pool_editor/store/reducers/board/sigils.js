
import { produce } from 'immer';
import { factions } from '@/lib/card_classification';
import { initializeStacksAndSigils } from '@/lib/board_initialization';
import { BoardTypes } from '@/lib/board_types';
import { GET_CARDS_FROM_EXPORT } from '@/components/pool_editor/store/actions/board';
import { ADD_SIGILS, SUB_SIGILS } from '@/components/pool_editor/store/actions/sigils';
import { SWITCH_BOARDS } from '@/components/pool_editor/store/actions/board';

const sigils = [].filter(card => card.name.endsWith('Sigil')); // TODO

export const initialState = {
  ...Object.fromEntries(factions.map((faction) => {
    return [faction, {
      card: sigils.find(sigil => sigil.name[0] === faction),
      count: 0
    }];
  })),
  selectedBoard: BoardTypes.MAIN,
};

export default boardType => (state = initialState, action) => {
  const selected = boardType === state.selectedBoard;

  switch (action.type) {
  case SWITCH_BOARDS:
    return {
      ...state,
      selectedBoard: action.selectedBoard
    };
  default:
    if (!selected) {
      return state;
    }
  }

  switch (action.type) {
  case ADD_SIGILS:
  case SUB_SIGILS:
    return produce(state, (draft) => {
      draft[action.faction].count = action.count;
    });
  case GET_CARDS_FROM_EXPORT:
    return produce(state, (draft) => {
      const [, sigils] = initializeStacksAndSigils(action.cards);
      factions.forEach(faction => draft[faction].count = sigils[faction].count);
    });
  default:
    return state;
  }
};
