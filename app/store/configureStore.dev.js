import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import * as zmqTypes from '../constants/zmq_action_types';
import * as networkScannerTypes from '../constants/network_scanner_action_types';
// import * as eonListActions from '../actions/eon_list_actions';
// import * as eonDetailActions from '../actions/eon_detail_actions';
import persistConfig from './persist';

//PERSISTED STORAGE
import { createMigrate, persistReducer, persistStore } from 'redux-persist';

const history = createHashHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const router = routerMiddleware(history);

const enhancer = compose(
  applyMiddleware(thunk),
  applyMiddleware(createSagaMiddleware),
  applyMiddleware(router),
);

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(sagaMiddleware);
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    predicate: (getState, action) => ![networkScannerTypes.SCAN_NETWORK_PROGRESS,zmqTypes.MESSAGE].includes(action.type),
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  // const actionCreators = {
  //   ...eonDetailActions,
  //   ...eonListActions,
  //   ...routerActions
  // };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  // const composeEnhancers = compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  // Create Store
  const store = createStore(connectRouter(history)(persistedReducer), initialState, enhancer);
  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return {
    store,
    persistor
  };
};

export default { configureStore, history };
