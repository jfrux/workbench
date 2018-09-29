/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/network_scanner_action_types';
import settings from 'electron-settings';

const initialState = {
  scanning: false,
  scanResults: {},
  status: "not_scanned",
  progress: 0,
  scanCount: 0,
  maxCount: 762
};

export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    case types.SCAN_NETWORK_COMPLETE:
      return {
        ...state,
        status: "not_scanning",
        scanning: false
      };
    
    case types.SCAN_NETWORK:
      return {
        ...state,
        status: "scanning",
        scanning: true,
        progress: 0,
        scanCount: 0,
        maxCount: 762
      };
    
    case types.SCAN_NETWORK_PROGRESS:
      return {
        ...state,
        // progress: parseInt(action.payload.percentage)
      };

    case types.SCAN_NETWORK_RESULT:
      // console.log("REDUCER SCAN_NETWORK_SUCCESS:",action.payload.results);
      return {
        ...state,
        // status: "scanned_has_results",
        scanResults: {
          ...state.scanResults,
          ...action.payload
        },
        // scanning: false,
        // progress: 0
      };
    case types.SCAN_NETWORK_FAIL:
      return {
        ...state,
        status: "scanned_error",
        newResults: null,
        scanError: action.payload.err,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        progress: 0,
        scanning: false
      };
    case types.SCAN_NETWORK_RESET:
      return {
        ...state,
        scanError: null,
        scanning: false,
        selectedEon: null,
        status: "not_scanned",
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        sshCurrentCommand: null,
        sshLog: [],
        sshCommandErrors: null,
        sshCommandStatus: "idle",
        progress: 0
      };
    default:
      return state;
  }
}
