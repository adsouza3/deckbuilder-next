import { BoardTypes } from './board_types';

export const getCurrentState = (state) => {
  const { board, selection, settings } = state;

  const current = (s) => {
    switch (s.mainBoard.selectedBoard) {
    case BoardTypes.MAIN:
      return s.mainBoard;
    case BoardTypes.SIDE:
      return s.sideBoard;
    case BoardTypes.MARKET:
      return s.market || {};
    default:
      console.error('Bad board type');
      return s.mainBoard;
    }
  };

  return {
    board: current(board),
    sigils: board.mainBoard.selectedBoard === BoardTypes.MAIN ? board.sigils : board.marketSigils,
    selection: current(selection),
    settings: current(settings)
  };
};

export const getCards = (board) => {
  return Object.values(board.stacks).reduce(
    (arr, stack) => [...arr, ...Object.values(stack.cards)],
    []
  );
};

export const sigilObjectToArray = (sigils) => {
  return Object.values(sigils).reduce((arr, sigil) => {
    return [...arr, ...(_.times(sigil.count, () => sigil.card))];
  }, []);
};
