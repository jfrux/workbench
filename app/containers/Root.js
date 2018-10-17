// @flow
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../Routes';
import LoadingOverlay from '../components/LoadingOverlay';

export default class Root extends Component {
  componentDidUpdate = prevProps => {
    const name = this.constructor.displayName || this.constructor.name || 'Component';
    console.group(name);
    Object.keys(prevProps).forEach(key => {
      if (prevProps[key] !== this.props[key]) {
        console.log(
          `property ${key} changed from ${prevProps[key]} to ${
            this.props[key]
          }`
        );
      }
    });
    console.groupEnd(name);
  }
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
