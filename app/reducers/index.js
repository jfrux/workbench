import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import connectEon from './connect_eon';
console.warn(connectEon);
const rootReducer = combineReducers({
  connectEon,
  router
});

export default rootReducer;
