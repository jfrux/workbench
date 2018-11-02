import React from 'react';
import {webFrame} from 'electron';
import { render } from 'react-dom';
import rpc from './rpc-client';
import * as config from './utils/config';
import * as plugins from './utils/plugins';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import init from './actions/index';
import {loadConfig, reloadConfig} from './actions/config';
import { configureStore, history } from './store/configureStore';
import './app.global.scss';

// Disable pinch zoom
// webFrame.setZoomLevelLimits(1, 1);

const configuredStore = configureStore();
const store_ = configuredStore.store;
const persistor = configuredStore.persistor;

window.__defineGetter__('store', () => _store);
window.__defineGetter__('rpc', () => rpc);
window.__defineGetter__('config', () => config);
window.__defineGetter__('plugins', () => plugins);

// initialize config
store_.dispatch(loadConfig(config.getConfig()));
config.subscribe(() => {
  store_.dispatch(reloadConfig(config.getConfig()));
});

// initialize communication with main electron process
// and subscribe to all user intents for example from menus
rpc.on('ready', () => {
  store_.dispatch(init());
  // store_.dispatch(uiActions.setFontSmoothing());
});
render(
  <AppContainer>
    <Root persistor={persistor} store={store_} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store_} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}