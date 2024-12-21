import uuid from 'short-uuid';
import _ from 'lodash';

import { initialState as initialSigils } from '@/components/pool_editor/store/reducers/board/sigils';

const DEFAULT_STACK_ROWS = 2;
const DEFAULT_STACK_COLS = 5;

export const initializeStacks = (cards, stackRows = DEFAULT_STACK_ROWS, stackCols = DEFAULT_STACK_COLS) => {
  const stacks = {};
  [...Array(stackRows).keys()].forEach((rowIndex) => {
    [...Array(stackCols).keys()].forEach((colIndex) => {
      stacks[`${rowIndex}:${colIndex}`] = {
        id: `${rowIndex}:${colIndex}`,
        rowIndex,
        colIndex,
        cards: {},
        position: {
          top: 0,
          left: 0
        }
      };
    });
  });

  // cards.slice(0, 8).forEach((card, i) => {
  cards.forEach((card, i) => {
    i = i % (stackRows * stackCols);
    const rowIndex = Math.floor(i / stackCols);
    const colIndex = i % stackCols;
    const cardId = uuid.generate();
    stacks[`${rowIndex}:${colIndex}`].cards[cardId] = {
      ...card,
      id: cardId
    };
  });

  return stacks;
};

export const initializeStacksAndSigils = (cards, stackRows = DEFAULT_STACK_ROWS, stackCols = DEFAULT_STACK_COLS) => {
  const [stackCards, sigils] = cards.reduce(([stackCards, sigils], card) => {
    if (card.name.endsWith('Sigil')) {
      sigils[card.name[0]].count = sigils[card.name[0]].count + 1;
    } else {
      stackCards.push(card);
    }
    return [stackCards, sigils];
  }, [[], _.cloneDeep(initialSigils)]);

  return [initializeStacks(stackCards, stackRows, stackCols), sigils];
};