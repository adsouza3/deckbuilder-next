import React from 'react';
import PropTypes from 'prop-types';

import { factions } from '@/lib/card_classification';
import Icon from '@/components/common/icon';

const Influence = ({ influence }) => {
  return <>
    {Array.from(influence).map((char, i) => {
      if (factions.indexOf(char) !== -1) {
        return <Icon key={i} type="faction" option={char} />;
      }
    })}
  </>;
};

Influence.propTypes = {
  influence: PropTypes.string
};

export default Influence;
