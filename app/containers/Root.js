// @flow
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../Routes';
import LoadingOverlay from '../components/LoadingOverlay'

export default class Root extends Component {
  render() {
    const { store, history, persistor } = this.props;
    // persistor.purgeAll()
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingOverlay />} persistor={persistor} history={history}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}
