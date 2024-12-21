import {
  CLEAR_FILTERS,
  CLEAR_HIGHLIGHTS,
  SET_FILTER_BUILD_STATUSES,
  SET_FILTER_COSTS,
  SET_FILTER_CUSTOM,
  SET_FILTER_FACTIONS,
  SET_FILTER_FACTION_STRICT,
  SET_FILTER_RARITIES,
  SET_FILTER_TYPES,
  SET_HIGHLIGHT_BUILD_STATUSES,
  SET_HIGHLIGHT_COSTS,
  SET_HIGHLIGHT_CUSTOM,
  SET_HIGHLIGHT_FACTIONS,
  SET_HIGHLIGHT_FACTION_STRICT,
  SET_HIGHLIGHT_RARITIES,
  SET_HIGHLIGHT_SEARCH,
  SET_HIGHLIGHT_TYPES,
  SET_SORTING_MODE,
  SET_GROUPING_MODE
} from '@/components/pool_editor/store/actions/settings';
import { SWITCH_BOARDS } from '@/components/pool_editor/store/actions/board';
import { SET_FILTER_SEARCH } from '@/components/pool_editor/store/actions/settings';
import { BoardTypes } from '@/lib/board_types';
import { Classes } from '@/lib/card_classification';

const intitialFilters = {
  buildStatuses: [],
  costs: [],
  factions: [],
  rarities: [],
  types: []
};

export const initialState = {
  filters: intitialFilters,
  grouping: {
    mode: Classes.FACTION
  },
  highlights: intitialFilters,
  sorting: {
    mode: Classes.RARITY
  },
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
  case SET_FILTER_FACTIONS:
    return {
      ...state,
      filters: {
        ...state.filters,
        factions: action.factions
      }
    };
  case SET_FILTER_FACTION_STRICT:
    return {
      ...state,
      filters: {
        ...state.filters,
        strictFactions: action.strict
      }
    };
  case SET_FILTER_RARITIES:
    return {
      ...state,
      filters: {
        ...state.filters,
        rarities: action.rarities
      }
    };
  case SET_FILTER_COSTS:
    return {
      ...state,
      filters: {
        ...state.filters,
        costs: action.costs
      }
    };
  case SET_FILTER_TYPES:
    return {
      ...state,
      filters: {
        ...state.filters,
        types: action.types
      }
    }; 
  case SET_FILTER_BUILD_STATUSES:
    return {
      ...state,
      filters: {
        ...state.filters,
        buildStatuses: action.buildStatuses
      }
    }; 
  case SET_FILTER_SEARCH:
    return {
      ...state,
      filters: {
        ...state.filters,
        text: action.text
      }
    };
  case SET_FILTER_CUSTOM:
    return {
      ...state,
      filters: {
        ...state.filters,
        custom: action.text
      }
    };
  case CLEAR_FILTERS:
    return {
      ...state,
      filters: initialState.filters
    };
  case SET_HIGHLIGHT_FACTIONS:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        factions: action.factions
      }
    };
  case SET_HIGHLIGHT_FACTION_STRICT:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        strictFactions: action.strict
      }
    };
  case SET_HIGHLIGHT_RARITIES:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        rarities: action.rarities
      }
    };
  case SET_HIGHLIGHT_COSTS:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        costs: action.costs
      }
    };
  case SET_HIGHLIGHT_TYPES:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        types: action.types
      }
    }; 
  case SET_HIGHLIGHT_BUILD_STATUSES:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        buildStatuses: action.buildStatuses
      }
    }; 
  case SET_HIGHLIGHT_SEARCH:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        text: action.text
      }
    };
  case SET_HIGHLIGHT_CUSTOM:
    return {
      ...state,
      highlights: {
        ...state.highlights,
        custom: action.text
      }
    };
  case CLEAR_HIGHLIGHTS:
    return {
      ...state,
      highlights: initialState.filters
    };
  case SET_SORTING_MODE:
    return {
      ...state,
      sorting: {
        ...state.sorting,
        mode: action.mode
      }
    };
  case SET_GROUPING_MODE:
    return {
      ...state,
      grouping: {
        ...state.grouping,
        mode: action.mode
      }
    };
  default:
    return state;
  }
};
