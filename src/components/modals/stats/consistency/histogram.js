import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Chart from '@/components/charts/consistency';

const Histogram = ({ uniqueSpells }) => {
  const [granularity, setGranularity] = useState(5);

  // TODO: granularity control
  return (
    <div className="histogram">
      <Chart uniqueSpells={uniqueSpells} granularity={granularity} />
    </div>
  );
};

Histogram.propTypes = {
  uniqueSpells: PropTypes.array.isRequired
};

export default Histogram;
