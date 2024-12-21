import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { applyFilters } from '@/lib/card_filter';
import { getCards } from '@/lib/state_helper';

import Chart from 'react-google-charts';

const TribeChart = ({ cards, filters }) => {
  const filteredCards = applyFilters(Object.values(cards), filters);

  let data = {};
  filteredCards.forEach((card) => {
    if (card.cardType.includes('unit')) {
      (card.unitType || []).forEach((type) => {
        data[type] = data[type] ? data[type] + 1 : 1;
      });
      // TODO payoffs
    }
  });

  data = Object.keys(data).map(type => [type, ' ', data[type]]);

  data = [
    [
      'Tribe',
      'Parent',
      'Count'
    ],
    [
      ' ',
      null,
      0
    ],
    ...data
  ];

  const chartEvents = [
    {
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        chart.setSelection([]);
      },
      eventName: 'select'
    }
  ];

  const generateTooltip = (row, size) => {
    return `<div class="treemap-tooltip">${size}</div>`;
  };

  return (
    <div className="tribes-chart">
      <Chart
        maxDepth={0}
        chartEvents={chartEvents}
        chartType="TreeMap"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          maxColor: '#00ff00',
          midColor: '#77ff77',
          minColor: '#ddffdd',
          headerHeight: 0,
          fontColor: 'black',
          showScale: false,
          generateTooltip
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

TribeChart.propTypes = {
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

export default connect(mapStateToProps)(TribeChart);