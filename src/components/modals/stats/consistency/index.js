import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { getProbabilities } from '@/lib/combinatorics';
import { classifyType, Factions, factions } from '@/lib/card_classification';
import { applyFilters } from '@/lib/card_filter';
import { getCards, sigilObjectToArray } from '@/lib/state_helper';
import { groupDuplicates } from '@/lib/card_group';

import Table from './table';
import Histogram from './histogram';
import Controls from './controls';

import './styles.scss';

const DeckConsistency = ({ cards, filters, sigils }) => {
  const [fireSources, setFireSources] = useState(sigils[Factions.FIRE].count);
  const [timeSources, setTimeSources] = useState(sigils[Factions.TIME].count);
  const [justiceSources, setJusticeSources] = useState(sigils[Factions.JUSTICE].count);
  const [primalSources, setPrimalSources] = useState(sigils[Factions.PRIMAL].count);
  const [shadowSources, setShadowSources] = useState(sigils[Factions.SHADOW].count);
  const [displayMode, setDisplayMode] = useState('table');

  const sourceSetter = (faction) => {
    switch (faction) {
    case Factions.FIRE: return setFireSources;
    case Factions.TIME: return setTimeSources;
    case Factions.JUSTICE: return setJusticeSources;
    case Factions.PRIMAL: return setPrimalSources;
    case Factions.SHADOW: return setShadowSources;
    }
  };

  const sourceCount = (faction) => {
    switch (faction) {
    case Factions.FIRE: return fireSources;
    case Factions.TIME: return timeSources;
    case Factions.JUSTICE: return justiceSources;
    case Factions.PRIMAL: return primalSources;
    case Factions.SHADOW: return shadowSources;
    }
  };

  const sources = {};
  factions.forEach(faction => sources[faction] = sourceCount(faction));

  const filteredCards = applyFilters(Object.values(cards), filters);
  const totalCount = filteredCards.length + sigilObjectToArray(sigils).length;

  const filteredSpells = filteredCards.filter((card) => {
    return !classifyType(card, 'power');
  });

  const uniqueSpells = useMemo(() => {
    const uniqueSpells = groupDuplicates(filteredSpells);
    getProbabilities(uniqueSpells, sources, totalCount);
    return uniqueSpells;
  }, [cards, filters, sigils, sources]);

  return <>
    <div className="consistency-modal">
      {displayMode === 'table' ?
        <Table uniqueSpells={uniqueSpells} /> :
        <Histogram uniqueSpells={uniqueSpells}/>
      }
      <Controls
        displayMode={displayMode}
        sources={sources}
        sourceSetter={sourceSetter}
        onDisplayModeChange={setDisplayMode}
      />
    </div>
  </>;
};

DeckConsistency.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.object.isRequired,
  sigils: PropTypes.object,
};

const mapStateToProps = ({ present: { board, settings } }) => {
  const cards = getCards(board.mainBoard);

  return {
    cards,
    filters: settings.mainBoard.filters,
    sigils: board.sigils
  };
};

export default connect(mapStateToProps)(DeckConsistency);