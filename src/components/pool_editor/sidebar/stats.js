import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Checkbox } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';

import { setOutlineRarity } from '../store/actions/settings';
import { applyFilters } from '@/lib/card_filter';

import CostChart from '@/components/charts/cost';
import StatsModal from '@/components/modals/stats';
import { Types } from '@/lib/card_classification';
import { getCards, sigilObjectToArray } from '@/lib/state_helper';

import './styles.scss';

export class Stats extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.object,
    highlights: PropTypes.object,
    outlineRarity: PropTypes.bool,
    setOutlineRarity: PropTypes.func.isRequired,
    sigils: PropTypes.object
  }

  state = {
    showStatsModal: false,
  };

  handleStatsClick = () => {
    this.setState({ showStatsModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showStatsModal: false });
  };

  render() {
    const filteredCards = applyFilters(Object.values(this.props.cards), this.props.filters);
    const totalFilteredCards = [...filteredCards, ...this.props.sigils];

    const highlightedCards = applyFilters(Object.values(this.props.cards), this.props.highlights);

    return (
      <div>
        <CostChart />
        <div className="deck-summary">
          <div className="deck-summary-row">
            <div>{`Cards: ${totalFilteredCards.length}`}</div>
            <div>{`Power: ${totalFilteredCards.filter(c => c.cardType === Types.POWER).length}`}</div>
          </div>
          <div className="deck-summary-row">
            <Checkbox
              checked={this.props.outlineRarity}
              label="Rarity outline"
              onChange={(e, data) => this.props.setOutlineRarity(data.checked)}
            />
            <div>{highlightedCards.length !== filteredCards.length && `Highlighted: ${highlightedCards.length}`}</div>
          </div>
        </div>
        <Button className="mr-2" variant="primary" onClick={this.handleStatsClick}>More Info</Button>
        {this.renderStatsModal()}
      </div>
    );
  }

  renderStatsModal() {
    return <StatsModal show={this.state.showStatsModal} onHide={this.handleCloseModal} />;
  }

}

const mapStateToProps = ({ present: { board, settings } }) => {
  const cards = getCards(board.mainBoard);

  return {
    cards,
    filters: settings.mainBoard.filters,
    highlights: settings.mainBoard.highlights,
    outlineRarity: settings.common.outlineRarity,
    sigils: sigilObjectToArray(board.sigils)
  };
};

const mapDispatchToProps = {
  setOutlineRarity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);