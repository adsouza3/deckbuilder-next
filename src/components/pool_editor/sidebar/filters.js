import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GenericFilters from './generic_filters';
import { getCards } from '@/lib/state_helper';

import {
  clearFilters,
  setFilterBuildStatuses,
  setFilterCosts,
  setFilterCustom,
  setFilterFactions,
  setFilterFactionStrict,
  setFilterRarities,
  setFilterSearch,
  setFilterTypes
} from '@/components/pool_editor/store/actions/settings';
import { getCurrentState } from '@/lib/state_helper';

const Filters = ({
  buildStatuses,
  cards,
  clearFilters,
  costs,
  custom,
  factions,
  rarities,
  setFilterBuildStatuses,
  setFilterCosts,
  setFilterCustom,
  setFilterFactions,
  setFilterFactionStrict,
  setFilterRarities,
  setFilterSearch,
  setFilterTypes,
  strictFactions,
  text,
  types
}) => {
  return (
    <GenericFilters
      cards={cards}
      clear={clearFilters}
      custom={custom}
      filterType="filter"
      selectedBuildStatuses={buildStatuses}
      selectedCosts={costs}
      selectedFactions={factions}
      selectedRarities={rarities}
      selectedTypes={types}
      setBuildStatuses={setFilterBuildStatuses}
      setCosts={setFilterCosts}
      setCustom={setFilterCustom}
      setFactions={setFilterFactions}
      setFactionsStrict={setFilterFactionStrict}
      setRarities={setFilterRarities}
      setSearch={setFilterSearch}
      setTypes={setFilterTypes}
      strictFactions={strictFactions}
      text={text}
    />
  );
};

Filters.propTypes = {
  buildStatuses: PropTypes.arrayOf(PropTypes.string),
  cards: PropTypes.array.isRequired,
  clearFilters: PropTypes.func.isRequired,
  costs: PropTypes.arrayOf(PropTypes.string),
  custom: PropTypes.string,
  factions: PropTypes.arrayOf(PropTypes.string),
  rarities: PropTypes.arrayOf(PropTypes.string),
  setFilterBuildStatuses: PropTypes.func.isRequired,
  setFilterCosts: PropTypes.func.isRequired,
  setFilterCustom: PropTypes.func.isRequired,
  setFilterFactions: PropTypes.func.isRequired,
  setFilterFactionStrict: PropTypes.func.isRequired,
  setFilterRarities: PropTypes.func.isRequired,
  setFilterSearch: PropTypes.func.isRequired,
  setFilterTypes: PropTypes.func.isRequired,
  strictFactions: PropTypes.bool,
  text: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
};

const mapDispatchToProps = {
  clearFilters,
  setFilterBuildStatuses,
  setFilterCosts,
  setFilterCustom,
  setFilterFactions,
  setFilterFactionStrict,
  setFilterRarities,
  setFilterSearch,
  setFilterTypes
};

const mapStateToProps = ({ present }) => {
  const { board, settings: { filters } } = getCurrentState(present);

  const cards = getCards(board);


  return {
    buildStatuses: filters.buildStatuses,
    cards,
    costs: filters.costs,
    factions: filters.factions,
    custom: filters.custom,
    rarities: filters.rarities,
    strictFactions: filters.strictFactions,
    text: filters.text || '',
    types: filters.types
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);