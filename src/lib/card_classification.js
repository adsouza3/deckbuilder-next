export const Classes = {
  FACTION: 'faction',
  RARITY: 'rarity',
  TYPE: 'type',
  COST: 'cost',
  BUILD_STATUS: 'buildStatus'
};

export const Factions = {
  FIRE: 'F',
  TIME: 'T',
  JUSTICE: 'J',
  PRIMAL: 'P',
  SHADOW: 'S'
};
export const FACTIONLESS = 'NONE';

export const Rarities = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  // PROMO,
  LEGENDARY: 'legendary'
};

export const Types = {
  UNIT: 'unit',
  ATTACHMENT: 'attachment',
  SITE: 'site',
  SPELL: 'spell',
  POWER: 'power'
};

export const Costs = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7+',
};

export const BuildStatuses = {
  IN_BUILD: 'inBuild',
  NEW: 'new'
};

export const factions = Object.values(Factions);
export const rarities = Object.values(Rarities);
export const types = Object.values(Types);
export const costs = Object.values(Costs);
export const buildStatuses = Object.values(BuildStatuses);

export const classifications = (card, category, options = {}) => {
  switch (category) {
  case Classes.FACTION:
    return factions.filter(faction => classifyFaction(card, faction, options));
  case Classes.RARITY:
    return rarities.filter(rarity => classifyRarity(card, rarity));
  case Classes.TYPE:
    return types.filter(type => classifyType(card, type));
  case Classes.COST:      
    return costs.filter(cost => classifyCost(card, cost));
  default:
    return [];
  }
};

export const classify = (card, category, option) => {
  switch (category) {
  case Classes.FACTION:
    return classifyFaction(card, option);
  case Classes.RARITY:
    return classifyRarity(card, option);
  case Classes.TYPE:
    return classifyType(card, option);
  case Classes.COST:
    return classifyCost(card, option);
  default:
    return false;
  }
};

export const classifyFaction = (card, faction, options = {}) => {
  return card.influence.includes(`{${faction}}`) ||
    (!options.strict && card.cardText.includes(`{${faction}}`));
};

export const classifyRarity = (card, rarity) => {
  return card.rarity === rarity;
};

export const classifyType = (card, type) => {
  const { cardType } = card;

  switch (type) {
  case Types.ATTACHMENT:
    return cardType.includes('weapon') || cardType.includes('relic') || cardType.includes('curse');
  case Types.UNIT:
  case Types.SITE:
  case Types.SPELL:
  case Types.POWER:
    return cardType.includes(type);
  default:
    return false;
  }
};

export const classifyCost = (card, cost) => {
  const cardCosts = (card, costFilterString) => {
    const costFilter = parseInt(costFilterString[0]);
    if (costFilterString.includes('+')) {
      return card.cost >= costFilter;
    } else {
      return card.cost == costFilter;
    }
  };

  return cardCosts(card, cost);
};

export const classifyBuildStatus = (card, buildStatus) => {
  switch (buildStatus) {
  case BuildStatuses.IN_BUILD:
    return card.inBuild;
  case BuildStatuses.NEW:
    return !card.inPreviousPool;
  default:
    return false;
  }
};