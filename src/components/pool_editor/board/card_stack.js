import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentState } from '@/lib/state_helper';

import Card from './card';

import './styles.scss';
import { applySorting } from '@/lib/card_sort';
import { applyFilters } from '@/lib/card_filter';

class CardStack extends React.Component {
  static propTypes = {
    cards: PropTypes.object.isRequired,
    cardSpacing: PropTypes.number.isRequired,
    left: PropTypes.number,
    settings: PropTypes.object.isRequired,
    stackId: PropTypes.string.isRequired,
    top: PropTypes.number
  }

  cardOffset = 30;
  
  render() {
    if (!this.props.cards) {
      return;
    }

    let filteredCards = applyFilters(Object.values(this.props.cards), this.props.settings.filters);
    filteredCards = applySorting(filteredCards, this.props.settings.sorting);
    const style = {
      top: this.props.top,
      left: this.props.left
    };

    const cards = filteredCards.map((card, i) => {
      return (
        <Card
          key={i}
          card={card}
          stackId={this.props.stackId}
          top={this.props.top + this.props.cardSpacing * i}
          left={this.props.left}
        />
      );
    });

    return <React.Fragment>
      {cards}
      <div key="card-stack" className={`card-stack ${filteredCards.length ? '' : 'empty'}`} style={style}/>
    </React.Fragment>;
  }
}

const mapStateToProps =  ({ present }) => {
  const { board, settings } = getCurrentState(present);

  return {
    cardSpacing: board.cardSpacing,
    dragDrop: board.dragDrop,
    settings
  };
};

export default connect(mapStateToProps)(CardStack);