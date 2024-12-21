import {
  OPEN_CONTEXT_MENU,
  CLOSE_CONTEXT_MENU
} from '@/components/pool_editor/store/actions/context_menu';
import {
  SET_WINDOW_SIZE,
  SWITCH_BOARDS
} from '@/components/pool_editor/store/actions/board';

export default (state = null, action) => {
  switch (action.type) {
  case OPEN_CONTEXT_MENU:
    return {
      stackId: action.stackId,
      card: action.card,
      left: action.x,
      top: action.y,
    };
  case CLOSE_CONTEXT_MENU:
  case SET_WINDOW_SIZE:
  case SWITCH_BOARDS:
    return null;
  default:
    return state;
  }
};
