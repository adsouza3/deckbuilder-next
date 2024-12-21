import {
  EXPAND_SETTINGS,
  COLLAPSE_SETTINGS,
  SET_OUTLINE_RARITY,
} from '@/components/pool_editor/store/actions/settings';

export default (state = { expanded: true }, action) => {
  switch (action.type) {
  case EXPAND_SETTINGS:
    return { ...state, expanded: true };
  case COLLAPSE_SETTINGS:
    return { ...state, expanded: false };
  case SET_OUTLINE_RARITY:
    return { ...state, outlineRarity: action.outlineRarity };
  default:
    return state;
  }
};
