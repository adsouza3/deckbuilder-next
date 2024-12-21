import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import board from './board';
import dependencyCards from './dependency_cards';
import contextMenu from './context_menu';
import editor from './editor';
import focus from './focus';
import selection from './selection';
import settings from './settings';
import { SET_WINDOW_SIZE, CARD_DRAG_BEGIN, CARD_DRAG_END } from '@/components/pool_editor/store/actions/board';

const reducers = combineReducers({
  board,
  contextMenu,
  dependencyCards,
  editor,
  focus,
  selection,
  settings
});

let windowInitialized = false;
let dragDropIndex = 0;

const mainReducer = undoable(reducers, {
  filter: (action) => {
    const firstWindowSizing = action.type === SET_WINDOW_SIZE && !windowInitialized;
    windowInitialized |= action.type === SET_WINDOW_SIZE;
    return (
      action.undoable ||
      firstWindowSizing
    );
  },
  groupBy: (action) => {
    if (action.type === CARD_DRAG_BEGIN) {
      dragDropIndex++;
      return dragDropIndex;
    } else if (action.type === CARD_DRAG_END) {
      return dragDropIndex;
    }
    return null;
  },
  ignoreInitialState: true
});


const test = (state, action) => {
  return mainReducer(state, action);
};

export default test;