import { combineReducers } from 'redux';

import { BoardTypes } from '@/lib/board_types';
import board from './board';
import previousMarket from './previous_market';
import sigils from './sigils';
import sets from './sets';

const reducers = combineReducers({
  mainBoard: board(BoardTypes.MAIN),
  market: board(BoardTypes.MARKET),
  marketSigils: sigils(BoardTypes.MARKET),
  previousMarket,
  sets,
  sideBoard: board(BoardTypes.SIDE),
  sigils: sigils(BoardTypes.MAIN)
});

export default reducers;