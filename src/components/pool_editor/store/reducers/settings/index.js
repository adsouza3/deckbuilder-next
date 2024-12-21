import { combineReducers } from 'redux';

import { BoardTypes } from '@/lib/board_types';
import settings from './settings';
import common from './common';

const mainBoard = settings(BoardTypes.MAIN);
const sideBoard = settings(BoardTypes.SIDE);
const market = settings(BoardTypes.MARKET);
const reducers = combineReducers({
  common,
  mainBoard,
  market,
  sideBoard
});

export default reducers;