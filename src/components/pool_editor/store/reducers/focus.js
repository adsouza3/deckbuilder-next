import {
  FOCUS_CARD,
  CLEAR_FOCUSED_CARD
} from '@/components/pool_editor/store/actions/focus';

export default (state = null, action) => {
  switch (action.type) {
  case FOCUS_CARD:
    return action.card;
  case CLEAR_FOCUSED_CARD:
    return null;
  default:
    return state;
  }
};
