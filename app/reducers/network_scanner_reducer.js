/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/network_scanner_action_types';

const initialState = {
  scanning: false,
  scanResults: {},
  status: "not_scanning",
  progress: 0,
  scanCount: 0,
  maxCount: 762,
  foundCount: 0
};
const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;
export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    case types.MAC_ADDRESS_SUCCESS:
      return {
        ...state,
        scanResults: {
          ...state.scanResults,
          ...action.payload
        }
      }
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
        scanResults: {},
        scanCount: 0,
        foundCount: 0
      };
      
    case types.SCAN_NETWORK_COUNT:
      return {
        ...state,
        maxCount: action.payload
      };
    
    case types.SCAN_NETWORK_PARTIAL_COMPLETE:
      return {
        ...state,
        scanCount: state.scanCount+1,
        progress: (state.scanCount+1)/state.maxCount
      };
    case types.SCAN_NETWORK_RESULT:
      return {
        ...state,
        foundCount: state.foundCount+1
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
    case types.REMOVE_SCANNED_RESULT:
      // console.log("deleting property",state.scanResults,action.payload.id);
      deleteProperty(state.scanResults,action.payload.id);
      return {
        ...state,
        scanResults: deleteProperty(state.scanResults,action.payload.id)
      }
    default:
      return state;
  }
}
