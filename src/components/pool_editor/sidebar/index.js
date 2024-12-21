import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Accordion, Card } from 'react-bootstrap';

import { getCurrentState } from '@/lib/state_helper';
import { BoardTypes } from '@/lib/board_types';

import Filters from './filters';
import Highlight from './highlight';
import Sorting from './sorting';
import Grouping from './grouping';
import ImportExport from './import_export';
import Sigils from './sigils';
import MarketSigils from './market_sigils';
import Stats from './stats';
import BoardSelector from './board_selector';

export class Sidebar extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    importMode: PropTypes.bool,
    selectedBoard: PropTypes.string.isRequired
  }

  render() {
    const { expanded, importMode, selectedBoard } = this.props;

    let SigilComponent;
    if (selectedBoard === BoardTypes.MAIN) {
      SigilComponent = Sigils;
    } else if (selectedBoard === BoardTypes.MARKET) {
      SigilComponent = MarketSigils;
    }

    return (
      <div className={`sidebar ${expanded ? '' : 'collapsed'}`}>
        <BoardSelector />
        {/* {this.renderSection('Deck Stats', Stats)}  TODO */}
        {SigilComponent && this.renderSection('Sigils', SigilComponent)}
        {this.renderSection('Filters', Filters)}
        {this.renderSection('Highlight', Highlight)}
        {selectedBoard !== BoardTypes.MARKET && this.renderSection('Sorting', Sorting)}
        {selectedBoard !== BoardTypes.MARKET && this.renderSection('Grouping', Grouping)}
        {selectedBoard === BoardTypes.MAIN && this.renderSection('Import / Export', ImportExport, importMode)}
      </div>
    );
  }

  renderSection(title, Component, expanded = false) {
    return (
      <React.Fragment>
        <Accordion defaultActiveKey={expanded ? '0' : null}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              {/* <Card>
                <Card.Body> */}
                  <Component />
                {/* </Card.Body>
              </Card> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </React.Fragment>
    );
  }
}

const mapStateToProps =  ({ present }) => {
  const { board } = getCurrentState(present);

  return {
    expanded: present.settings.common.expanded,
    importMode: present.editor.importMode,
    selectedBoard: board.selectedBoard,
  };
};

export default connect(mapStateToProps)(Sidebar);