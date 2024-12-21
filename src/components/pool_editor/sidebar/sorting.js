import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import _ from 'lodash';

import { setSortMode } from '@/components/pool_editor/store/actions/settings';

import { sortModes } from '@/lib/card_sort';
import { getCurrentState } from '@/lib/state_helper';

export class Sorting extends React.Component {
  static propTypes = {
    mode: PropTypes.string,
    setSortMode: PropTypes.func.isRequired,
  }

  onChange = (mode) => {
    this.props.setSortMode(mode);
  }

  render() {
    const modeRow1 = sortModes.slice(0, 3);
    const modeRow2 = sortModes.slice(3);

    return (
      <div className="sorting-buttons-container">
        <ButtonGroup >
          {modeRow1.map((mode) => {
            const checked = this.props.mode === mode;
            return (
              <ToggleButton
                id={`sort-${mode}`}
                key={mode}
                type="checkbox"
                variant={checked ? 'primary' : 'secondary'}
                checked={checked}
                onChange={e => this.onChange(mode, e.currentTarget.checked)}
              >
                {_.capitalize(mode)}
              </ToggleButton>
            );
          })}
        </ButtonGroup>
        <ButtonGroup >
          {modeRow2.map((mode) => {
            const checked = this.props.mode === mode;
            return (
              <ToggleButton
                id={`sort-${mode}`}
                key={mode}
                type="checkbox"
                variant={checked ? 'primary' : 'secondary'}
                checked={checked}
                onChange={e => this.onChange(mode, e.currentTarget.checked)}
              >
                {_.capitalize(mode)}
              </ToggleButton>
            );
          })}
        </ButtonGroup>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setSortMode
};

const mapStateToProps = ({ present }) => {
  const { settings: { sorting } } = getCurrentState(present);

  return {
    mode: sorting.mode
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);