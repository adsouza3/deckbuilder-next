import { applyFilters } from '@/lib/card_filter';
import { applySorting } from './card_sort';
import { Classes } from './card_classification';
import { groupDuplicates } from './card_group';

export const toDeckFormat = (cards, sigils = [], settings = null, marketCards = [], marketSigils = []) => {
  if (settings) {
    cards = applyFilters(cards, settings.filters);
  }
  // TODO: does the app have other criteria?
  cards = applySorting(cards, { mode: Classes.COST });

  cards = [...cards, ...sigils];
  const rowData = groupDuplicates(cards);

  const cardStrings = rowData.map(
    card => `${card.count} ${card.name} (Set${card.setNumber} #${card.eternalId})`
  );

  let marketCardStrings = [];
  marketCards = [...marketCards, ...marketSigils];
  if (marketCards.length) {
    marketCardStrings = [
      '--------------MARKET---------------',
      ...marketCards.map(card => `1 ${card.name} (Set${card.setNumber} #${card.eternalId})`)
    ];
  }

  return ['FORMAT:Throne', ...cardStrings, ...marketCardStrings].join('\n');
};

export const toWarcryUrlFormat = (cards, sigils, settings, marketCards = []) => {
  cards = applyFilters(cards, settings.filters);
  cards = [...cards, ...sigils];
  const rowData = groupDuplicates(cards);

  let ret = `main=${rowData.map((card) => {
    return `${card.setNumber}-${card.eternalId}:${card.count}`;
  }).join(';')}`;

  if (marketCards.length > 0) {
    ret += `&market=${marketCards.map((card) => {
      return `${card.setNumber}-${card.eternalId}:1}`;
    }).join(';')}`;
  }

  return ret;
};