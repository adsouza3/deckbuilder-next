import { setWindowSize } from './board';

export const SET_FILTER_FACTIONS = 'SET_FILTER_FACTIONS';
export const setFilterFactions = (factions) => {
  return {
    type: SET_FILTER_FACTIONS,
    factions,
    undoable: true
  };
};

export const SET_FILTER_FACTION_STRICT = 'SET_FILTER_FACTION_STRICT';
export const setFilterFactionStrict = (strict) => {
  return {
    type: SET_FILTER_FACTION_STRICT,
    strict,
    undoable: true
  };
};

export const SET_FILTER_RARITIES = 'SET_FILTER_RARITIES';
export const setFilterRarities = (rarities) => {
  return {
    type: SET_FILTER_RARITIES,
    rarities,
    undoable: true
  };
};

export const SET_FILTER_COSTS = 'SET_FILTER_COSTS';
export const setFilterCosts = (costs) => {
  return {
    type: SET_FILTER_COSTS,
    costs,
    undoable: true
  };
};

export const SET_FILTER_TYPES = 'SET_FILTER_TYPES';
export const setFilterTypes = (types) => {
  return {
    type: SET_FILTER_TYPES,
    types,
    undoable: true
  };
};

export const SET_FILTER_BUILD_STATUSES = 'SET_FILTER_BUILD_STATUSES';
export const setFilterBuildStatuses = (buildStatuses) => {
  return {
    type: SET_FILTER_BUILD_STATUSES,
    buildStatuses,
    undoable: true
  };
};

export const SET_FILTER_SEARCH = 'SET_FILTER_SEARCH';
export const setFilterSearch = (text) => {
  return {
    type: SET_FILTER_SEARCH,
    text,
    undoable: true
  };
};

export const SET_FILTER_CUSTOM = 'SET_FILTER_CUSTOM';
export const setFilterCustom = (text) => {
  return {
    type: SET_FILTER_CUSTOM,
    text,
    undoable: true
  };
};

export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  };
};

export const SET_HIGHLIGHT_FACTIONS = 'SET_HIGHLIGHT_FACTIONS';
export const setHighlightFactions = (factions) => {
  return {
    type: SET_HIGHLIGHT_FACTIONS,
    factions,
    undoable: true
  };
};

export const SET_HIGHLIGHT_FACTION_STRICT = 'SET_HIGHLIGHT_FACTION_STRICT';
export const setHighlightFactionStrict = (strict) => {
  return {
    type: SET_HIGHLIGHT_FACTION_STRICT,
    strict,
    undoable: true
  };
};

export const SET_HIGHLIGHT_RARITIES = 'SET_HIGHLIGHT_RARITIES';
export const setHighlightRarities = (rarities) => {
  return {
    type: SET_HIGHLIGHT_RARITIES,
    rarities,
    undoable: true
  };
};

export const SET_HIGHLIGHT_COSTS = 'SET_HIGHLIGHT_COSTS';
export const setHighlightCosts = (costs) => {
  return {
    type: SET_HIGHLIGHT_COSTS,
    costs,
    undoable: true
  };
};

export const SET_HIGHLIGHT_TYPES = 'SET_HIGHLIGHT_TYPES';
export const setHighlightTypes = (types) => {
  return {
    type: SET_HIGHLIGHT_TYPES,
    types,
    undoable: true
  };
};

export const SET_HIGHLIGHT_BUILD_STATUSES = 'SET_HIGHLIGHT_BUILD_STATUSES';
export const setHighlightBuildStatuses = (buildStatuses) => {
  return {
    type: SET_HIGHLIGHT_BUILD_STATUSES,
    buildStatuses,
    undoable: true
  };
};

export const SET_HIGHLIGHT_SEARCH = 'SET_HIGHLIGHT_SEARCH';
export const setHighlightSearch = (text) => {
  return {
    type: SET_HIGHLIGHT_SEARCH,
    text,
    undoable: true
  };
};

export const SET_HIGHLIGHT_CUSTOM = 'SET_HIGHLIGHT_CUSTOM';
export const setHighlightCustom = (text) => {
  return {
    type: SET_HIGHLIGHT_CUSTOM,
    text,
    undoable: true
  };
};

export const CLEAR_HIGHLIGHTS = 'CLEAR_HIGHLIGHTS';
export const clearHighlights = () => {
  return {
    type: CLEAR_HIGHLIGHTS
  };
};

export const SET_SORTING_MODE = 'SET_SORTING_MODE';
export const setSortMode = (mode) => {
  return {
    type: SET_SORTING_MODE,
    mode,
    undoable: true
  };
};

export const SET_GROUPING_MODE = 'SET_GROUPING_MODE';
export const setGroupingMode = mode => (dispatch, getState) => {
  const boardWidthCoefficient = getState().present.settings.common.expanded ? 0.8 : 1;
  dispatch({
    type: SET_GROUPING_MODE,
    mode,
    boardWidthCoefficient,
    undoable: true
  });
};

export const EXPAND_SETTINGS = 'EXPAND_SETTINGS';
export const expandSettings = () => (dispatch) => {
  const dimensions = { width: window.innerWidth, height: window.innerHeight };

  dispatch({
    type: EXPAND_SETTINGS
  });

  dispatch(setWindowSize(dimensions));
};

export const COLLAPSE_SETTINGS = 'COLLAPSE_SETTINGS';
export const collapseSettings = () => (dispatch) => {
  const dimensions = { width: window.innerWidth, height: window.innerHeight };

  dispatch({
    type: COLLAPSE_SETTINGS
  });

  dispatch(setWindowSize(dimensions));
};

export const SET_OUTLINE_RARITY = 'SET_OUTLINE_RARITY';
export const setOutlineRarity = (outlineRarity) => {
  return {
    type: SET_OUTLINE_RARITY,
    outlineRarity
  };
};