import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MarketCard from './market_card';
import PreviousMarket from './previous_market';
import { selectCard, clearSelection } from '@/components/pool_editor/store/actions/selection';
import { openContextMenu } from '@/components/pool_editor/store/actions/context_menu';
import { getCurrentState } from '@/lib/state_helper';
import { factions } from '@/lib/card_classification';
import { getCards } from '@/lib/state_helper';

const Market = ({ cards, selectedIds, clearSelection, openContextMenu, selectCard, settingsExpanded, sigils }) => {
  const handleContextMenu = (event, card) => {
    event.preventDefault();
    openContextMenu('0:0', card, event.clientX, event.clientY);
  };

  const handleCardClick = (event, card) => {
    event.stopPropagation();
    selectCard(card, '0:0', event.metaKey, event.shiftKey);
  };

  const handleBoardClick = () => {
    clearSelection();
  };

  return <>
    <PreviousMarket />
    <div className={`card-board market-board ${settingsExpanded ? '' : 'fullscreen'}`} onClick={handleBoardClick}>
      {factions.map((faction) => {
        return sigils[faction].count ?
          <MarketCard card={sigils[faction].card} key={faction} onContextMenu={e => e.preventDefault()}/> :
          null;
      })}
      {cards.map((card, i) => (
        <MarketCard
          card={card}
          key={i}
          selectedIds={selectedIds}
          onCardClick={handleCardClick}
          onContextMenu={handleContextMenu}
        />
      ))}
    </div>
  </>;
};

Market.propTypes = {
  cards: PropTypes.array.isRequired,
  clearSelection: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  selectCard: PropTypes.func.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  settingsExpanded: PropTypes.bool,
  sigils: PropTypes.object.isRequired 
};

const mapDispatchToProps = {
  clearSelection,
  openContextMenu,
  selectCard
};

const mapStateToProps =  ({ present }) => {
  const { board, selection, sigils } = getCurrentState(present);
  const cards = getCards(board);


  return {
    cards,
    selectedIds: selection.selectedIds,
    settingsExpanded: present.settings.common.expanded,
    sigils
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);