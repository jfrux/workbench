import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import connectEon from './connect_eon';
import openpilot from './openpilot';
const rootReducer = combineReducers({
  connectEon,
  openpilot,
  router
});

export default rootReducer;
