import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';
import _ from 'lodash';

import { classifyType, types } from '@/lib/card_classification';
import { applyFilters } from '@/lib/card_filter';
import { getCards, sigilObjectToArray } from '@/lib/state_helper';

const TypeChart = ({ cards, filters, sigils }) => {
  let filteredCards = applyFilters(Object.values(cards), filters);

  filteredCards = [...filteredCards, ...sigils];

  const countData = types.map(type => filteredCards.filter(card => classifyType(card, type)).length);
  const data = {
    labels: types.map((type, i) => `${_.capitalize(type)}: ${countData[i]}`),
    datasets: [
      {
        data: countData,
        backgroundColor: [
          '#003f5c',
          '#58508d',
          '#bc5090',
          '#ff6361',
          '#ffa600'
        ]
      }
    ]
  };
  
  const options = {
    title: {
      display: true,
      text: 'Type'
    },
    legend: {
      display: true,
      position: 'left'
    }
  };

  return <>
    <Pie data={data} options={options} />
  </>;
};

TypeChart.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.object.isRequired,
  sigils: PropTypes.object
};

const mapStateToProps = ({ present: { board, settings } }) => {
  const cards = getCards(board.mainBoard);

  return {
    cards,
    filters: settings.mainBoard.filters,
    sigils: sigilObjectToArray(board.sigils)
  };
};

export default connect(mapStateToProps)(TypeChart);