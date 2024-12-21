import React from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { isCardFiltered } from '@/lib/card_filter';
import { Rarities } from '@/lib/card_classification';
import { cardDragBegin, cardDragEnd } from '@/components/pool_editor/store/actions/board';
import { selectCard } from '@/components/pool_editor/store/actions/selection';
import { openContextMenu } from '@/components/pool_editor/store/actions/context_menu';
import { focusCard } from '@/components/pool_editor/store/actions/focus';
import { getCurrentState } from '@/lib/state_helper';

import './styles.scss';

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      rarity: PropTypes.string.isRequired,
    }).isRequired,
    cardDragBegin: PropTypes.func.isRequired,
    cardDragEnd: PropTypes.func.isRequired,
    contextMenuCardId: PropTypes.string,
    focusCard: PropTypes.func.isRequired,
    highlights: PropTypes.object,
    left: PropTypes.number.isRequired,
    openContextMenu: PropTypes.func.isRequired,
    outlineRarity: PropTypes.bool,
    selectCard: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string),
    stackId: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired
  }

  state = {}
  cardRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.justDropped && this.state.justDropped) {
      this.setState({ justDropped: false });
    }
  }

  handleStart = (event) => {
    this.props.selectCard(this.props.card, this.props.stackId, event.metaKey, event.shiftKey, { dragStart: true });
    this.props.cardDragBegin(this.props.card.id, this.props.stackId, {
      left: this.props.left,
      top: this.props.top 
    });
  }

  handleDrag = () => {
    //Nothing yet
  }

  handleStop = (event, dragDelta) => {
    this.props.cardDragEnd(this.props.card, this.props.stackId, dragDelta, event.metaKey, event.shiftKey);
    this.setState({ justDropped: true });
  }

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }

  handleWheel = (event) => {
    const WHEEL_THRESHOLD_Y = 3;
    const scrollY = Math.abs(event.deltaY) < WHEEL_THRESHOLD_Y ? 0 : Math.round(event.deltaY / WHEEL_THRESHOLD_Y);
    if (scrollY < 0) {
      this.props.focusCard(this.props.card);
    }
  };
  
  handleContextMenu = (event) => {
    event.preventDefault();
    this.props.openContextMenu(this.props.stackId, this.props.card, event.clientX, event.clientY);
  }

  render() {
    const { contextMenuCardId, outlineRarity, selectedIds, card, left, top } = this.props;
    const style = {
      top: top,
      left: left
    };

    if (this.state.hovered || contextMenuCardId === card.id) {
      style.zIndex = 1;
    }
    
    const selected = (
      (selectedIds && selectedIds.indexOf(card.id) !== -1) ||
      (contextMenuCardId === card.id)
    );

    const highlighted = isCardFiltered(card, this.props.highlights, true);
    const innerClasses = classNames('true-frame', {
      highlighted: highlighted && !outlineRarity,
      'legendary-outline': outlineRarity && card.rarity === Rarities.LEGENDARY,
      'rare-outline': outlineRarity && card.rarity === Rarities.RARE,
      'uncommon-outline': outlineRarity && card.rarity === Rarities.UNCOMMON,
      selected
    });

    const innerCard = (
      <div
        className="handle card-wrapper"
        ref={this.cardRef}
        style={style}
      >
        <div
          className="card-content"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onWheel={this.handleWheel}
        >
          <img 
            className="card-img"
            draggable="false"
            src={card.imageUrl}
            width="150px"
            height="auto"
          />
          <div
            className={innerClasses}
            onContextMenu={this.handleContextMenu}
          />
        </div>
      </div>
    );

    if (this.state.justDropped) {
      return innerCard;
    } else {
      return (
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          enableUserSelectHack={false /* TODO gross */}
          nodeRef={this.cardRef}
          position={null}
          grid={[25, 25]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          {innerCard}
        </Draggable>
      );
    }
  }
}

const mapDispatchToProps = {
  cardDragBegin,
  cardDragEnd,
  openContextMenu,
  selectCard,
  focusCard
};

const mapStateToProps =  ({ present }) => {
  const { selection, settings: { highlights } } = getCurrentState(present);
  return {
    contextMenuCardId: present.contextMenu && present.contextMenu.card.id,
    highlights,
    outlineRarity: present.settings.common.outlineRarity,
    selectedIds: selection.selectedIds
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);