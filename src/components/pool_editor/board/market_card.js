import React from 'react';
import PropTypes from 'prop-types';

const MarketCard = ({ card, selectedIds, onCardClick, onContextMenu }) => {
  return (
    <div
      className="card-wrapper card-static"
      key={card.id}
    >
      <div
        className="card-content"
      >
        <img 
          className="card-img"
          draggable="false"
          src={card.imageUrl}
          width="150px"
          height="auto"
        />
        <div
          className={`true-frame ${(selectedIds && selectedIds.indexOf(card.id) !== -1) ? 'selected' : ''}`}
          onContextMenu={event => onContextMenu(event, card)}
          onClick={event => onCardClick(event, card)}
        />
      </div>
    </div>
  );
};

MarketCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
  selectedIds: PropTypes.array,
  onCardClick: PropTypes.func,
  onContextMenu: PropTypes.func
};

export default MarketCard;