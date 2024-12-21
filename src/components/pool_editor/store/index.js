import { applyMiddleware, createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';

import reducer from './reducers';

import { initialState as initialSettingsState } from '@/components/pool_editor/store/reducers/settings/settings';
import { initialState as initialBoardState } from '@/components/pool_editor/store/reducers/board/board';
import { initializeStacksAndSigils } from '@/lib/board_initialization';

const stackRows = 2;
const stackCols = 5;

const [stacks, sigils] = initializeStacksAndSigils([]);

const state = {
  board: {
    mainBoard: {
      ...initialBoardState,
      stackRows,
      stackCols,
      stacks,
    },
    market: {
      ...initialBoardState,
    },
    sideBoard: {
      ...initialBoardState,
    },
    sigils
  },
  dependencyCards: {},
  editor: {
    draftMode: false,
    hasImported: false,
    importMode: true,
    paths: {},

  },
  settings: {
    mainBoard: initialSettingsState,
    sideBoard: initialSettingsState,
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  state,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;