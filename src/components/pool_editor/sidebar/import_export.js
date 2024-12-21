import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import ImportModal from '@/components/modals/import';
import ExportModal from '@/components/modals/export';

import { addCards, getCardsFromExport } from '@/components/pool_editor/store/actions/board';
import { setGroupingMode } from '@/components/pool_editor/store/actions/settings';
import { toDeckFormat } from '@/lib/eternal_deck_format';
import { toWarcryUrlFormat } from '@/lib/eternal_deck_format';
import { getCards, sigilObjectToArray } from '@/lib/state_helper';
import { Classes } from '@/lib/card_classification';

export class ImportExport extends React.Component {
  static propTypes = {
    addCards: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    getCardsFromExport: PropTypes.func.isRequired,
    hasImported: PropTypes.bool,
    importMode: PropTypes.bool,
    marketCards: PropTypes.arrayOf(PropTypes.object).isRequired,
    marketSigils: PropTypes.arrayOf(PropTypes.object).isRequired,
    setGroupingMode: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    sigils: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      builtImportText: '',
      loadBuilt: false,
      previousPoolText: '',
      primaryImportText: '',
      saveBuilt: false,
      showImportModal: !props.hasImported, // TODO: Don't open by default if we get other users
      showExportModal: false,
    };
  }

  handleImportClick = () => {
    this.setState({ showImportModal: true });
  };

  handleExportClick = () => {
    this.setState({ showExportModal: true });
  };

  handleCloseModal = () => {
    this.setState({
      showImportModal: false,
      showExportModal: false,
    });
  };

  handleSubmitImportModal = () => {
    this.props.getCardsFromExport(
      this.state.primaryImportText,
      this.state.builtImportText,
      this.state.previousPoolText
    );
    this.props.setGroupingMode(Classes.FACTION);
    this.setState({ showImportModal: false });
  };


  handlePrimaryImportTextChange = (value) => {
    this.setState({ primaryImportText: value });
  }

  handleBuiltImportTextChange = (value) => {
    this.setState({ builtImportText: value });
  }

  handlePreviousPoolTextChange = (value) => {
    this.setState({ previousPoolText: value });
  }

  componentDidUpdate(previousProps, previousState) {
    if (!previousState.showImportModal && this.state.showImportModal) {
      // This seems a little too invasive.
      // navigator.clipboard.readText()
      // .then((text) => {
      //   this.setState({ importText: text || ''})
      // });
    }
  }

  render() {
    return (
      <div>
        {
          this.props.importMode && 
          <Button className="mr-2" variant="primary" onClick={this.handleImportClick}>
            Import
          </Button>
        }
        <Button variant="success" onClick={this.handleExportClick}>Export</Button>
        {this.renderImportModal()}
        {this.renderExportModal()}
      </div>
    );
  }

  renderImportModal() {
    return (
      <ImportModal
        show={this.state.showImportModal}
        builtText={this.state.builtImportText}
        previousPoolText={this.state.previousPoolText}
        primaryText={this.state.primaryImportText}
        onBuiltChange={this.handleBuiltImportTextChange}
        onPreviousPoolChange={this.handlePreviousPoolTextChange}
        onPrimaryChange={this.handlePrimaryImportTextChange}
        onHide={this.handleCloseModal}
        onSubmit={this.handleSubmitImportModal}
      />
    );
  }

  renderExportModal() {
    const { cards, sigils, settings, marketCards, marketSigils } = this.props;
    const deckText = toDeckFormat(cards, sigils, settings, marketCards, marketSigils);

    return (
      <ExportModal
        show={this.state.showExportModal}
        value={deckText}
        onHide={this.handleCloseModal}
        onWarcry={() => {
          window.open(
            `https://eternalwarcry.com/deck-builder?${toWarcryUrlFormat(cards, sigils, settings, marketCards)}`,
            '_blank'
          );
        }}
      />
    );
  }
}

const mapStateToProps = ({ present: { board, editor, settings } }) => {
  const cards = getCards(board.mainBoard);
  const sigils = sigilObjectToArray(board.sigils);
  const marketCards = getCards(board.market);
  const marketSigils = sigilObjectToArray(board.marketSigils);

  return {
    cards,
    hasImported: editor.hasImported,
    importMode: editor.importMode,
    marketCards,
    marketSigils,
    settings: settings.mainBoard,
    sigils
  };
};

const mapDispatchToProps = {
  addCards,
  getCardsFromExport,
  setGroupingMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportExport);