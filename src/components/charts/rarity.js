import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';

import { classifyRarity, rarities } from '@/lib/card_classification';
import { applyFilters } from '@/lib/card_filter';
import { getCards } from '@/lib/state_helper';

const RarityChart = ({ cards, filters }) => {
  const filteredCards = applyFilters(Object.values(cards), filters);

  const countData = rarities.map(rarity => filteredCards.filter(card => classifyRarity(card, rarity)).length);
  const data = {
    labels: rarities.map((rarity, i) => `${rarity}: ${countData[i]}`),
    datasets: [
      {
        data: countData,
        backgroundColor: [
          'rgba(51, 51, 51, 1)',
          'rgba(55, 107, 30, 1)',
          'rgba(56, 108, 195, 1)',
          // 'rgba(108, 44, 86, 1)',
          'rgba(197, 126, 51, 1)',
        ]
      }
    ]
  };
  
  const options = {
    title: {
      display: true,
      text: 'Rarity'
    },
    legend: {
      display: true,
      position: 'right'
    }
  };

  return <>
    <Pie data={data} options={options} />
  </>;
};

RarityChart.propTypes = {
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

export default connect(mapStateToProps)(RarityChart);