import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import saga from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

//PERSISTED STORAGE
import { createMigrate, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import migrations from './migrations';
const persistConfig = {
  key: 'root',
  storage,
  migrate: createMigrate(migrations, { debug: true })
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const history = createHashHistory();
const router = routerMiddleware(history);

const enhancer = compose(
  applyMiddleware(thunk),
  applyMiddleware(saga),
  applyMiddleware(router),
);

function configureStore(initialState) {
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)
  return {
    store,
    persistor
  };
}

export default { configureStore, history };
