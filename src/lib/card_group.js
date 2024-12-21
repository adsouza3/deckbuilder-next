import {
  Classes,
  classifications
} from './card_classification';
import { sortFuncs } from './card_sort';

export const groupingModes = Object.values(Classes).filter(mode => mode !== Classes.BUILD_STATUS);

export const applyGrouping = (cards, grouping) => {
  const groups = {};
  const mode = grouping.mode || grouping;
  cards.forEach((card) => {
    const cardClassifications = classifications(card, mode);
    if (cardClassifications.length === 1) {
      const classification = cardClassifications[0];
      groups[classification] = [...(groups[classification] || []), card];
    } else {
      groups['_'] = [...(groups['_'] || []), card];
    }
  });

  return Object.values(groups).sort((g1, g2) => {
    const [r1, r2] = sortFuncs[mode](g1[0], g2[0]);
    return r1 < r2 ? -1 : 1;
  });
};

export const groupDuplicates = (cards) => {
  const uniqueCards = {};
  cards.forEach((card) => {
    uniqueCards[card.name] = {
      ...card,
      count: uniqueCards[card.name] ? uniqueCards[card.name].count + 1 : 1
    };
  });

  return Object.values(uniqueCards);
};