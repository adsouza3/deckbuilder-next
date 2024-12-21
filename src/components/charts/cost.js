import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

import { classifyCost, classifyType, costs } from '@/lib/card_classification';
import { applyFilters } from '@/lib/card_filter';
import { getCards } from '@/lib/state_helper';

const CostChart = ({ cards, filters }) => {
  const filteredCards = applyFilters(Object.values(cards), filters).filter((card) => {
    return !classifyType(card, 'power');
  });

  const data = {
    labels: costs,
    datasets: [
      {
        data: costs.map(cost => filteredCards.filter(card => classifyCost(card, cost)).length),
        backgroundColor: _.times(costs.length, () => 'rgba(255, 99, 132, 0.2)'),
        borderColor: _.times(costs.length, () => 'rgba(255, 99, 132, 1)'),
        borderWidth: 1,
      }
    ]
  };
  
  const options = {
    legend: { display: false },
    scales: {
      yAxes: [{ display: false }]
    }
  };

  return <>
    <Bar data={data} options={options} />
  </>;
};

CostChart.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.object.isRequired
};

const mapStateToProps = ({ present: { board, settings } }) => {
  const cards = getCards(board.mainBoard);

  return {
    cards,
    filters: settings.mainBoard.filters
  };
};

export default connect(mapStateToProps)(CostChart);