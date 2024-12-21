import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import { setGroupingMode } from '@/components/pool_editor/store/actions/settings';

import { groupingModes } from '@/lib/card_group';
import { getCurrentState } from '@/lib/state_helper';

export class Grouping extends React.Component {
  static propTypes = {
    mode: PropTypes.string,
    setGroupingMode: PropTypes.func.isRequired
  }

  onChange = (mode) => {
    this.props.setGroupingMode(mode);
  }

  render() {
    const modeRow1 = groupingModes.slice(0, 2);
    const modeRow2 = groupingModes.slice(2);

    return (
      <div className="grouping-buttons-container">
        <ButtonGroup >
          {modeRow1.map((mode) => {
            const checked = this.props.mode === mode;
            return (
              <ToggleButton
                id={`grouping-${mode}`}
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
  setGroupingMode
};

const mapStateToProps = ({ present }) => {
  const { settings: { grouping } } = getCurrentState(present);

  return {
    mode: grouping.mode
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grouping);