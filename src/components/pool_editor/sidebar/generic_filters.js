import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Checkbox, Input } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/webpack-resolver';

import Icon from '@/components/common/icon';
import CollapsibleSection from '@/components/common/collapsible_section';
import { getCards } from '@/lib/state_helper';

import _ from 'lodash';

import { BuildStatuses, Classes, costs, FACTIONLESS, factions, rarities, types } from '@/lib/card_classification';
import { getCurrentState } from '@/lib/state_helper';

const Filters = ({
  cards,
  clear,
  selectedCosts,
  custom,
  filterType,
  selectedBuildStatuses,
  selectedFactions,
  selectedRarities,
  selectedTypes,
  setBuildStatuses,
  setCosts,
  setCustom,
  setFactions,
  setFactionsStrict,
  setRarities,
  setSearch,
  setTypes,
  strictFactions,
  text
}) => {
  const getNewFilters = (filters, item, checked) => {
    let newFilters;
    if (checked) {
      newFilters = _.uniq([...filters, item]);
    } else {
      newFilters = filters.filter(t => t !== item);
    }

    return newFilters;
  };

  const onFactionChecked = (faction, checked) => {
    setFactions(getNewFilters(selectedFactions, faction, checked));
  };

  const onRarityChecked = (rarity, checked) => {
    setRarities(getNewFilters(selectedRarities, rarity, checked));
  };

  const onCostChecked = (cost, checked) => {
    setCosts(getNewFilters(selectedCosts, cost, checked));
  };

  const onTypeChecked = (type, checked) => {
    let newTypes;
    if (checked) {
      newTypes = _.uniq([...selectedTypes, type]);
    } else {
      newTypes = selectedTypes.filter(t => t !== type);
    }
    setTypes(newTypes);
  };

  const onBuildStatusChecked = (buildStatus, checked) => {
    setBuildStatuses(getNewFilters(selectedBuildStatuses, buildStatus, checked));
  };

  const onCustomChanged = _.debounce((value) => {
    setCustom(value);
  }, 250);

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  //TODO extract
  const filter = (label, type, options, selected, onChange) => {
    return (
      <React.Fragment>
        <h4>{label}:</h4>
        <ToggleButtonGroup type="checkbox">
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <ToggleButton
                id={`${filterType}-${label.toLowerCase()}-${option}`}
                key={`${filterType}-${label.toLowerCase()}-${option}`}
                className="filter-button"
                type="checkbox"
                variant={checked ? 'primary' : 'secondary'}
                checked={checked}
                onChange={() => {
                  onChange(option, !checked);
                }}
              >
                <Icon type={type} option={option} />
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </React.Fragment>
    );
  };

  const buildStatusOptions = [];
  if (cards.some(c => c.inPreviousPool)) {
    buildStatusOptions.push(BuildStatuses.NEW);
  }
  if (cards.some(c => c.inBuild)) {
    buildStatusOptions.push(BuildStatuses.IN_BUILD);
  }

  const userFilter = (
    <div className="function-editor">
      <AceEditor
        editorProps={{ $blockScrolling: Infinity }}
        height="200px"
        mode="javascript"
        theme="github"
        value={custom || ''}
        width="100%"
        onChange={onCustomChanged}
      />
    </div>
  );

  const customFilterTooltip = <>
    <div>
      {`Supply a function that will applied as a filter to all cards (example: "c => c.name === 'Decay'")`}
    </div>
    <div className="mt-2">
      Relevant fields on a card: setNumber, name, cardText, cost, influence, attack, health, rarity, cardType,
      unitType, cardDependencyNames, inBuild, inPreviousPool
    </div>
  </>;

  return (
    <React.Fragment>
      {filter(
        'Faction',
        Classes.FACTION,
        [...factions, FACTIONLESS],
        selectedFactions,
        onFactionChecked
      )}
      <Checkbox checked={strictFactions} label="Cost only" onChange={(e, data) => setFactionsStrict(data.checked)} />
      {filter('Rarity', Classes.RARITY, rarities, selectedRarities, onRarityChecked)}
      {filter('Cost', Classes.COST, costs, selectedCosts, onCostChecked)}        
      {filter('Type', Classes.TYPE, types, selectedTypes, onTypeChecked)}
      {
        buildStatusOptions.length > 0 &&
        filter(
          'Build Status',
          Classes.BUILD_STATUS,
          buildStatusOptions,
          selectedBuildStatuses,
          onBuildStatusChecked
        )
      }
      <Input
        action={{
          compact: true,
          content: 'X',
          color: 'red',
          onClick: () => setSearch('')
        }}
        className="filter-search"
        placeholder="Search..."
        size="small"
        value={text}
        onChange={handleSearchChange}
      />
      <CollapsibleSection
        className="user-filter-input"
        icon="info circle"
        title="Custom Filter"
        tooltip={customFilterTooltip}
      >
        {userFilter}
      </CollapsibleSection>
      <Button className="clear-filters" variant="danger" onClick={clear}>Clear</Button>
    </React.Fragment>
  );
};

Filters.propTypes = {
  cards: PropTypes.array.isRequired,
  clear: PropTypes.func.isRequired,
  custom: PropTypes.string,
  filterType: PropTypes.string.isRequired,
  selectedBuildStatuses: PropTypes.arrayOf(PropTypes.string),
  selectedCosts: PropTypes.arrayOf(PropTypes.string),
  selectedFactions: PropTypes.arrayOf(PropTypes.string),
  selectedRarities: PropTypes.arrayOf(PropTypes.string),
  selectedTypes: PropTypes.arrayOf(PropTypes.string),
  setBuildStatuses: PropTypes.func.isRequired,
  setCosts: PropTypes.func.isRequired,
  setCustom: PropTypes.func.isRequired,
  setFactions: PropTypes.func.isRequired,
  setFactionsStrict: PropTypes.func.isRequired,
  setRarities: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setTypes: PropTypes.func.isRequired,
  strictFactions: PropTypes.bool,
  text: PropTypes.string
};

const mapStateToProps = ({ present }) => {
  const { board } = getCurrentState(present);

  const cards = getCards(board);

  return {
    cards
  };
};

export default connect(mapStateToProps)(Filters);