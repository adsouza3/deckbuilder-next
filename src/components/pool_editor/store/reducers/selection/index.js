import { combineReducers } from 'redux';

import { BoardTypes } from '@/lib/board_types';
import selection from './selection';

const mainBoard = selection(BoardTypes.MAIN);
const sideBoard = selection(BoardTypes.SIDE);
const market = selection(BoardTypes.MARKET);
const reducers = combineReducers({
  mainBoard,
  market,
  sideBoard
});

export default reducers;