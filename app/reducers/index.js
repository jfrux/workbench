import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import eonListReducer from './eon_list_reducer';
import eonDetailReducer from './eon_detail_reducer';
import networkConnectionReducer from './network_connection_reducer';
const rootReducer = combineReducers({
  eonList: eonListReducer,
  eonDetail: eonDetailReducer,
  networkConnection: networkConnectionReducer,
  router
});

export default rootReducer;
