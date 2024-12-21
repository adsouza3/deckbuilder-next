import React from 'react';

import { Provider } from 'react-redux';

import store from './store';

import CardBoard from './board/card_board';
import Sidebar from './sidebar';
import ReminderModal from '@/components/modals/reminder';
import Toast from '@/components/common/toast';

import './styles.scss';

class PoolEditor extends React.Component {
  static propTypes = {};

  state = {}

  handleCloseModal = () => {
    this.setState({ showImportReminderModal: false });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="pool-editor">
          <CardBoard />
          <Sidebar />
          {/* TODO: Use this if we start taking on new users */}
          {/* this.renderImportReminderModal() */}
          <Toast />
        </div>
      </Provider>
    );
  }

  renderImportReminderModal() {
    return (
      <ReminderModal
        show={!!this.state.showImportReminderModal}
        text="Import some cards to get started."
        onHide={this.handleCloseModal}
      />
    );
  }
}

export default PoolEditor;