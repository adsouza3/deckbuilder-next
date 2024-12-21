import _ from 'lodash';

import { factions } from '@/lib/card_classification';

export const getProbabilities = (uniqueSpells, sources, totalCount) => {
  let seed = '';
  Object.keys(sources).forEach(influence => seed += influence.repeat(sources[influence]));
  seed += '-'.repeat(totalCount - seed.length);

  const probabilities = {};

  uniqueSpells.forEach((card) => {
    const key = `${card.cost}${card.influence}`;

    probabilities[key] = probabilities[key] || getProbability(card, seed);
    card.probability = probabilities[key];
  });
};

const getProbability = (card, seed) => {
  const sampleSize = 1000;
  let successes = 0;

  const sourcesRequired = {};
  factions.forEach((faction) => {
    sourcesRequired[faction] = card.influence.split(faction).length - 1;
  });

  for (let i = 0; i < sampleSize; i++) {
    // On the play
    const sample = _.sampleSize(seed, 6 + card.cost);

    const sourcesDrawn = {};
    factions.forEach(faction => sourcesDrawn[faction] = 0);
    sample.forEach((source) => {
      if (sourcesDrawn[source] != null) {
        sourcesDrawn[source]++;
      }
    });

    if (factions.every(faction => sourcesDrawn[faction] >= sourcesRequired[faction])) {
      successes++;
    }
  }

  return successes / sampleSize;
};