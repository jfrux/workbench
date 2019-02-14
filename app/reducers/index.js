import { combineReducers } from 'redux';
// import { routerReducer as router } from 'react-router-redux';
import eonListReducer from './eon_list_reducer';
import eonDetailReducer from './eon_detail_reducer';
import networkConnectionReducer from './network_connection_reducer';
import networkScannerReducer from './network_scanner_reducer';
import uiReducer from './ui_reducer';
import fileListReducer from './file_list_reducer';
import zmqReducer from './zmq_reducer';

const rootReducer = combineReducers({
  eonList: eonListReducer,
  eonDetail: eonDetailReducer,
  networkConnection: networkConnectionReducer,
  networkScanner: networkScannerReducer,
  ui: uiReducer,
  zmq: zmqReducer,
  fileList: fileListReducer
});

export default rootReducer;
