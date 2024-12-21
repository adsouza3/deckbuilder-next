import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import { Button, Label } from 'semantic-ui-react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import Icon from '@/components/common/icon';
import { factions } from '@/lib/card_classification';

const ConsistencyControls = ({ displayMode, sources, sourceSetter, onDisplayModeChange }) => {
  const addSources = faction => sourceSetter(faction)(sources[faction] + 1);
  const subSources = faction => sourceSetter(faction)(sources[faction] - 1);

  //TODO extract updown
  return (
    <div className="consistency-controls">
      <ToggleButtonGroup name="boardType">
        {['table', 'histogram'].map((mode) => {
          const checked = displayMode === mode;
          return (
            <ToggleButton
              id={`consistency-${mode}`}
              checked={checked}
              variant={checked ? 'primary' : 'secondary'}
              key={mode}
              name="boardType"
              onChange={() => onDisplayModeChange(mode)}
            >
              {_.capitalize(mode)}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <h2>Sources</h2>
      {factions.map((faction) => {
        return <React.Fragment key={faction}>
          <div className="sigil-counter">
            <div className="sigil-label">
              <Icon type="faction" option={faction} />
            </div>
            <Button color="grey" icon="minus" size="mini" onClick={() => subSources(faction)}/>
            <Label>
              <div className="sigil-count-label">{sources[faction]}</div>
            </Label>
            <Button color="grey" icon="plus" size="mini"  onClick={() => addSources(faction)}/>
          </div>
        </React.Fragment>;
      })}
    </div>
  );
};

ConsistencyControls.propTypes = {
  displayMode: PropTypes.string.isRequired,
  sources: PropTypes.object.isRequired,
  sourceSetter: PropTypes.func.isRequired,
  onDisplayModeChange: PropTypes.func.isRequired
};

export default ConsistencyControls;
