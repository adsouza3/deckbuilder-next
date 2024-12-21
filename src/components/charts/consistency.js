import React from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';

const ConsistencyChart = ({ uniqueSpells, granularity }) => {
  const labels = [];
  const dataPoints = [];
  for (let min = 0; min < 100; min += granularity) {
    const max = min + granularity;
    labels.push(`${min}-${max}`);
    dataPoints.push(uniqueSpells.filter(spell => spell.probability >= min / 100 && spell.probability < max / 100)
      .reduce((acc, spell) =>  acc + spell.count, 0));
  }

  const data = {
    labels,
    datasets: [
      {
        borderColor: 'blac',
        lineTension: 0,
        fill: false,
        borderJoinStyle: 'round',
        data: dataPoints,
        borderWidth: 0.2,
        barPercentage: 1,
        categoryPercentage: 1,
        hoverBackgroundColor: 'darkgray',
        barThickness: 'flex'
      }
    ]
  };
  
  const options = {
    legend: { display: false },
    scales: {
      x: {
        type: 'linear',
        offset: false,
        gridLines: {
          offsetGridLines: false
        },
        title: {
          display: true,
          text: 'Consistency'
        }
      }
    },
  };

  return <>
    <Bar data={data} options={options} />
  </>;
};

ConsistencyChart.propTypes = {
  granularity: PropTypes.number.isRequired,
  uniqueSpells: PropTypes.arrayOf(PropTypes.shape({
    cost: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    influence: PropTypes.string,
    name: PropTypes.string.isRequired,
    probability: PropTypes.number
  }))
};

export default ConsistencyChart;