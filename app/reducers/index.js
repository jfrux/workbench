import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import eonListReducer from './eon_list_reducer';
import eonDetailReducer from './eon_detail_reducer';

const rootReducer = combineReducers({
  eonList: eonListReducer,
  eonDetail: eonDetailReducer,
  router
});

export default rootReducer;
