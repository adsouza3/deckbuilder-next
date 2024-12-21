import {
  Classes,
  classifications,
  factions,
  rarities
} from './card_classification';

export const cardComparator = sorting => (stackId1, stackId2) => (card1, card2) => {
  const [stackRow1, stackCol1] = stackId1.split(':').map(i => parseInt(i));
  const [stackRow2, stackCol2] = stackId2.split(':').map(i => parseInt(i));
  const stackIndex1 = stackRow1 * 100 + stackCol1;
  const stackIndex2 = stackRow2 * 100 + stackCol2;

  if (stackIndex1 < stackIndex2) {
    return -1;
  } else if (stackIndex1 > stackIndex2) {
    return 1;
  } else if (card1.name === card2.name) {
    return 0;
  } else {
    return applySorting([card1, card2], sorting)[0] === card1 ? -1 : 1;
  }
};

export const sortModes = ['name', ...Object.values(Classes)].filter(mode => mode !== Classes.BUILD_STATUS);

export const sortFuncs = {
  'name': (c1, c2) => [c1.name, c2.name],
  [Classes.FACTION]: (c1, c2) =>  {
    const factions1 = classifications(c1, Classes.FACTION);
    const factions2 = classifications(c2, Classes.FACTION);
    if (
      (factions1.length === 1 && factions2.length === 1) ||
      (factions1.length > 1 && factions2.length > 1)      
    ) {
      if (factions1.length !== factions2.length) {
        return [factions1.length, factions2.length];
      }
      return [factions.indexOf(factions1[0]), factions.indexOf(factions2[0])];
    }

    const factionCountRank = (factions) => {
      switch (factions.length) {
      case 0: return 999;
      case 1: return 0;
      default: return factions.length;
      }
    };

    return [factionCountRank(factions1), factionCountRank(factions2)];
  },
  [Classes.RARITY]: (c1, c2) => [rarities.indexOf(c1.rarity), rarities.indexOf(c2.rarity)],
  [Classes.COST]: (c1, c2) => [c1.cost, c2.cost],
  [Classes.TYPE]: (c1, c2) => [c1.cardType, c2.cardType]
};

export const applySorting = (cards, sorting) => {
  cards.sort((c1, c2) => {
    let r1, r2;
    if (sorting.mode) {
      [r1, r2] = sortFuncs[sorting.mode](c1, c2);
    }
    if (r1 === r2) {
      [r1, r2] = sortFuncs.name(c1, c2);
    }

    return r1 < r2 ? -1 : 1;
  });
  return cards;
};