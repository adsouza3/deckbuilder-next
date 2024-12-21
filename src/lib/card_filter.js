import {
  Classes,
  classifications,
  classifyBuildStatus,
  classifyCost,
  classifyRarity,
  classifyType,
  FACTIONLESS
} from './card_classification';
import { filterByCustom } from './custom_filters';

export const applyFilters = (cards, filters) => {
  if (!filters) {
    return cards;
  }

  cards = cards.filter(card => isCardFiltered(card, filters));
  cards = filterByCustom(cards, filters.custom);
  return cards;
};

export const isCardFiltered = (card, filters, rejectEmptyFilters = false) => {
  if (rejectEmptyFilters && Object.values(filters).every(_.isEmpty)) {
    return false;
  }

  return cardMeetsFaction(card, filters) &&
    cardMeetsRarity(card, filters) && 
    cardMeetsCost(card, filters) &&
    cardMeetsType(card, filters) &&
    cardMatchesText(card, filters) &&
    cardMeetsBuildStatus(card, filters);
};

export const filterByFaction = (cards, filters) => {
  return cards.filter(card => cardMeetsFaction(card, filters));
};

const cardMeetsFaction = (card, filters) => {
  const filterFactions = filters.factions || [];
  const trueFilterFactions = filterFactions.filter(f => f !== FACTIONLESS);
  const includeFactionless = (filterFactions.length !== trueFilterFactions.length);
  const cardFactions = classifications(card, Classes.FACTION, { strict: filters.strictFactions });
  return (
    filterFactions.length === 0 ||
    trueFilterFactions.some(faction => cardFactions.indexOf(faction) !== -1) ||
    (includeFactionless && cardFactions.length === 0)
  );
};

export const filterByRarity = (cards, filters) => {
  return cards.filter(card => cardMeetsRarity(card, filters));
};

const cardMeetsRarity = (card, filters) => {
  const filterRarities = filters.rarities || [];
  return (
    filterRarities.length === 0 ||
    filterRarities.some(rarity => classifyRarity(card, rarity))
  );
};

export const filterByCost = (cards, filters) => {
  return cards.filter(card => cardMeetsCost(card, filters));
};

const cardMeetsCost = (card, filters) => {
  const filterCosts = filters.costs || [];
  return (
    filterCosts.length === 0 ||
    filterCosts.some(cost => classifyCost(card, cost))
  );
};

export const filterByType = (cards, filters) => {
  return cards.filter(card => cardMeetsType(card, filters));
};

const cardMeetsType = (card, filters) => {
  const filterTypes = filters.types || [];
  return (
    filterTypes.length === 0 ||
    filterTypes.some(type => classifyType(card, type))
  );
};

export const filterByText = (cards, filters) => {
  return cards.filter(card => cardMatchesText(card, filters));
};

const cardMatchesText = (card, filters) => {
  const filterText = filters.text ? filters.text.toLowerCase() : '';
  return (
    filterText.length === 0 ||
    card.name.toLowerCase().includes(filterText) ||
    card.cardType.toLowerCase().includes(filterText) ||
    card.cardText.toLowerCase().includes(filterText) ||
    (card.unitType || '').toLowerCase().includes(filterText)
  );
};

export const filterByBuildStatus = (cards, filters) => {
  return cards.filter(card => cardMeetsBuildStatus(card, filters));
};

const cardMeetsBuildStatus = (card, filters) => {
  const filterBuildStatuses = filters.buildStatuses || [];
  return (
    filterBuildStatuses.length === 0 ||
    filterBuildStatuses.some(buildStatus => classifyBuildStatus(card, buildStatus))
  );
};