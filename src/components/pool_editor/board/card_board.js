import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import PropTypes from 'prop-types';

import { moveCardsBetweenBoards, setWindowSize } from '@/components/pool_editor/store/actions/board';
import { closeContextMenu } from '@/components/pool_editor/store/actions/context_menu';
import { clearSelection } from '@/components/pool_editor/store/actions/selection';
import { clearFocusedCard } from '@/components/pool_editor/store/actions/focus';
import { initialize } from '@/lib/custom_filters';
import { getCurrentState } from '@/lib/state_helper';
import { BoardTypes } from '@/lib/board_types';

import Stack from './card_stack';
import Market from './market';
import ContextMenu from './context_menu';
import PoolControls from '@/components/pool_editor/controls';
import FocusModal from '@/components/modals/focus';
import InfoModal from '@/components/modals/info';

import './styles.scss';
import 'semantic-ui-css/semantic.min.css';

class CardBoard extends React.Component {
  static propTypes = {
    clearFocusedCard: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    closeContextMenu: PropTypes.func.isRequired,
    contextMenu: PropTypes.shape({
      card: PropTypes.object,
      left: PropTypes.number,
      stackId: PropTypes.string,
      top: PropTypes.number
    }),
    moveCardsBetweenBoards: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    selectedBoard: PropTypes.string.isRequired,
    settingsExpanded: PropTypes.bool,
    setWindowSize: PropTypes.func.isRequired,
    stackCols: PropTypes.number.isRequired,
    stackRows: PropTypes.number.isRequired,
    stacks: PropTypes.object.isRequired,
    undo: PropTypes.func.isRequired
  }

  state = {}

  async componentDidMount() {
    this.updateWindowDimensions();
    document.addEventListener('keydown', this.onKeyDown, false);
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('wheel', this.onWheel);

    await initialize();
    // this.props.fetchSets(); TODO
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('wheel', this.onWheel);
  }

  updateWindowDimensions = () => {
    this.props.setWindowSize(
      { width: window.innerWidth, height: window.innerHeight }
    );
  };

  onKeyDown = (event) => {
    if (event.key === 'z' && event.metaKey) {
      if (event.shiftKey) {
        this.props.redo();
      } else {
        this.props.undo();
      }
    }
  };

  onWheel = (event) => {
    const WHEEL_THRESHOLD_Y = 3;
    const scrollY = Math.abs(event.deltaY) < WHEEL_THRESHOLD_Y ? 0 : Math.round(event.deltaY / WHEEL_THRESHOLD_Y);
    if (scrollY > 0) {
      this.props.clearFocusedCard();
    }
  };

  handlemoveCardsBetweenBoards = (boardType) => {
    this.props.moveCardsBetweenBoards(boardType);
    this.props.closeContextMenu();
  };

  handleClick = () => {
    this.props.clearSelection();
  };

  handleInfo = () => {
    this.setState({ showInfo: true });
  }

  handleCloseInfoModal = () => {
    this.setState({ showInfo: false });
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBoard()}
        {this.renderDropDown()}
        <FocusModal />
        <InfoModal show={this.state.showInfo} onClose={this.handleCloseInfoModal} />
        <PoolControls onInfo={this.handleInfo}/>
      </React.Fragment>
    );
  }

  renderBoard() {
    if (this.props.selectedBoard === BoardTypes.MARKET) {
      return <Market />;
    }

    return (
      <div className={`card-board ${this.props.settingsExpanded ? '' : 'fullscreen'}`} onClick={this.handleClick}>
        {[...Array(this.props.stackRows).keys()].map((rowIndex) => {
          return this.renderRow(rowIndex);
        })}
      </div>
    );
  }

  renderRow(rowIndex) {
    return [...Array(this.props.stackCols).keys()].map((colIndex) => {
      return this.renderCell(rowIndex, colIndex);
    });
  }

  renderCell(rowIndex, colIndex) {
    const { id, cards, position: { top, left } } = this.props.stacks[`${rowIndex}:${colIndex}`];

    return (
      <Stack key={id} cards={cards} stackId={id} top={top} left={left} />
    );
  }

  renderDropDown() {
    const { closeContextMenu, contextMenu, selectedBoard } = this.props;
    if (!contextMenu) {
      return;
    }

    return (
      <ContextMenu
        left={contextMenu.left}
        selectedBoard={selectedBoard}
        top={contextMenu.top}
        onClose={closeContextMenu}
        onMoveCards={this.handlemoveCardsBetweenBoards}
      />
    );
  }
}

const mapDispatchToProps = {
  clearFocusedCard,
  clearSelection,
  moveCardsBetweenBoards,
  setWindowSize,
  closeContextMenu,
  undo: UndoActionCreators.undo,
  redo: UndoActionCreators.redo
};

const mapStateToProps = ({ present }) => {
  const { board } = getCurrentState(present);
  return {
    contextMenu: present.contextMenu,
    dimensions: board.dimensions,
    selectedBoard: board.selectedBoard,
    settingsExpanded: present.settings.common.expanded,
    stackRows: board.stackRows,
    stackCols: board.stackCols,
    stacks: board.stacks
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);