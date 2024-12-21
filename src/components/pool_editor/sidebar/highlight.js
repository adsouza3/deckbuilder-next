import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GenericFilters from './generic_filters';
import { getCards } from '@/lib/state_helper';

import {
  clearHighlights,
  setHighlightBuildStatuses,
  setHighlightCosts,
  setHighlightCustom,
  setHighlightFactions,
  setHighlightFactionStrict,
  setHighlightRarities,
  setHighlightSearch,
  setHighlightTypes
} from '@/components/pool_editor/store/actions/settings';
import { getCurrentState } from '@/lib/state_helper';

const Highlights = ({
  buildStatuses,
  cards,
  clearHighlights,
  costs,
  custom,
  factions,
  rarities,
  setHighlightBuildStatuses,
  setHighlightCosts,
  setHighlightCustom,
  setHighlightFactions,
  setHighlightFactionStrict,
  setHighlightRarities,
  setHighlightSearch,
  setHighlightTypes,
  strictFactions,
  text,
  types
}) => {
  return (
    <GenericFilters
      cards={cards}
      clear={clearHighlights}
      custom={custom}
      filterType="highlight"
      selectedBuildStatuses={buildStatuses}
      selectedCosts={costs}
      selectedFactions={factions}
      selectedRarities={rarities}
      selectedTypes={types}
      setBuildStatuses={setHighlightBuildStatuses}
      setCosts={setHighlightCosts}
      setCustom={setHighlightCustom}
      setFactions={setHighlightFactions}
      setFactionsStrict={setHighlightFactionStrict}
      setRarities={setHighlightRarities}
      setSearch={setHighlightSearch}
      setTypes={setHighlightTypes}
      strictFactions={strictFactions}
      text={text}
    />
  );
};

Highlights.propTypes = {
  buildStatuses: PropTypes.arrayOf(PropTypes.string),
  cards: PropTypes.array.isRequired,
  clearHighlights: PropTypes.func.isRequired,
  costs: PropTypes.arrayOf(PropTypes.string),
  custom: PropTypes.string,
  factions: PropTypes.arrayOf(PropTypes.string),
  rarities: PropTypes.arrayOf(PropTypes.string),
  setHighlightBuildStatuses: PropTypes.func.isRequired,
  setHighlightCosts: PropTypes.func.isRequired,
  setHighlightCustom: PropTypes.func.isRequired,
  setHighlightFactions: PropTypes.func.isRequired,
  setHighlightFactionStrict: PropTypes.func.isRequired,
  setHighlightRarities: PropTypes.func.isRequired,
  setHighlightSearch: PropTypes.func.isRequired,
  setHighlightTypes: PropTypes.func.isRequired,
  strictFactions: PropTypes.bool,
  text: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
};

const mapDispatchToProps = {
  clearHighlights,
  setHighlightBuildStatuses,
  setHighlightCosts,
  setHighlightCustom,
  setHighlightFactions,
  setHighlightFactionStrict,
  setHighlightRarities,
  setHighlightSearch,
  setHighlightTypes
};

const mapStateToProps = ({ present }) => {
  const { board, settings: { highlights } } = getCurrentState(present);

  const cards = getCards(board);

  return {
    buildStatuses: highlights.buildStatuses,
    cards,
    costs: highlights.costs,
    factions: highlights.factions,
    custom: highlights.custom,
    rarities: highlights.rarities,
    strictFactions: highlights.strictFactions,
    text: highlights.text || '',
    types: highlights.types
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);