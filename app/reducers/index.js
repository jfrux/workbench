import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import eonListReducer from './eon_list_reducer';
import eonDetailReducer from './eon_detail_reducer';
import networkConnectionReducer from './network_connection_reducer';
import networkScannerReducer from './network_scanner_reducer';
// import carStateReducer from './car_state_reducer';
// import carControlReducer from './car_control_reducer';
// import thermalReducer from './thermal_reducer';
// import systemReducer from './system_reducer';

const rootReducer = combineReducers({
  eonList: eonListReducer,
  eonDetail: eonDetailReducer,
  networkConnection: networkConnectionReducer,
  networkScanner: networkScannerReducer,
  // carControl: carControlReducer,
  // carState: carStateReducer,
  // thermal: thermalReducer,
  // system: systemReducer,
  router
});

export default rootReducer;
