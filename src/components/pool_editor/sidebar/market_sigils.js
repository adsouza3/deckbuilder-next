import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import { factions } from '@/lib/card_classification';
import { addSigils, subSigils } from '@/components/pool_editor/store/actions/sigils';
import Icon from '@/components/common/icon';

const MarketSigils = ({ sigils, addSigils, subSigils }) => {
  return (
    <React.Fragment>
      <ToggleButtonGroup type="checkbox">
        {factions.map((faction) => {
          const checked = !!sigils[faction].count;
          return (
            <ToggleButton
              id={`market-sigils-${faction}`}
              key={faction}
              className="filter-button"
              type="checkbox"
              variant={checked ? 'primary' : 'secondary'}
              checked={checked}
              onChange={() => checked ? subSigils(faction) : addSigils(faction)}
            >
              <Icon type="faction" option={faction} />
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </React.Fragment>
  );
};

MarketSigils.propTypes = {
  addSigils: PropTypes.func.isRequired,
  sigils: PropTypes.object,
  subSigils: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addSigils,
  subSigils
};

const mapStateToProps = ({ present }) => {
  return {
    sigils: present.board.marketSigils
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketSigils);