import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';

import { classifyFaction, classifyType, factions } from '@/lib/card_classification';
import { applyFilters } from '@/lib/card_filter';
import { getCards } from '@/lib/state_helper';

const FactionChart = ({ cards, filters }) => {
  const filteredCards = applyFilters(Object.values(cards), filters).filter((card) => {
    return !classifyType(card, 'power');
  });

  const countData = factions.map(faction => filteredCards.filter(card => classifyFaction(card, faction)).length);
  const data = {
    labels: factions.map((faction, i) => `${faction}: ${countData[i]}`),
    datasets: [
      {
        data: countData,
        backgroundColor: [
          'rgba(92, 15, 12, 1)',
          'rgba(136, 99, 57, 1)',
          'rgba(69, 101, 48, 1)',
          'rgba(44, 64, 138, 1)',
          'rgba(80, 43, 121, 1)',
        ]
      }
    ]
  };
  
  const options = {
    title: {
      display: true,
      text: 'Faction'
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

FactionChart.propTypes = {
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

export default connect(mapStateToProps)(FactionChart);