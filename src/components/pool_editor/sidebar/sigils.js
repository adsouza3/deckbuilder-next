import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Label } from 'semantic-ui-react';

import { factions } from '@/lib/card_classification';
import { addSigils, subSigils } from '@/components/pool_editor/store/actions/sigils';
import Icon from '@/components/common/icon';

const Sigils = ({ sigils, addSigils, subSigils }) => {

  return <React.Fragment>
    {factions.map((faction) => {
      return <React.Fragment key={faction}>
        <div className="sigil-counter">
          <div className="sigil-label">
            <Icon type="faction" option={faction} />
          </div>
          <Button color="grey" icon="minus" size="mini" onClick={() => subSigils(faction)}/>
          <Label>
            <div className="sigil-count-label">{sigils[faction].count}</div>
          </Label>
          <Button color="grey" icon="plus" size="mini"  onClick={() => addSigils(faction)}/>
        </div>
      </React.Fragment>;
    })}
  </React.Fragment>;
};

Sigils.propTypes = {
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
    sigils: present.board.sigils
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sigils);