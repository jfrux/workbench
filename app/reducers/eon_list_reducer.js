/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/eon_list_action_types';
import settings from 'electron-settings';

const initialState = {
  scanResults: [],
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

export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    /* SSH Connections might should be moved to EON reducer */
    case types.CONNECT_SSH:
      return {
        ...state,
        sshStatus: "connecting",
        sshConnectionStatus: "connected"
      };
    case types.CONNECT_SSH_SUCCESS:
      return {
        ...state,
        sshStatus: "connected",
        sshConnectionStatus: "connected",
        sshConnectionError: null
      };
    case types.CONNECT_SSH_FAIL:
      return {
        ...state,
        sshStatus: "failed",
        selectedEon: null,
        sshConnectionError: action.payload.err,
        sshConnectionStatus: "not_connected_error"
      };
    case types.SSH_COMMAND:
      return {
        ...state,
        sshCommand: action.payload.command,
        sshCommandStatus: "executing"
      };
    case types.SSH_COMMAND_RESPONSE:
      return {
        ...state,
        sshCommand: action.payload.response,
        sshCommandStatus: "executing"
      };
    case types.SSH_COMMAND_COMPLETE:
      return {
        ...state,
        sshCommand: null,
        sshCommandStatus: "success"
      };
    case types.SSH_COMMAND_FAIL:
      return {
        ...state,
        sshCommand: null,
        sshCommandStatus: "failed",
        sshCommandError: action.payload.error
      };
    case types.CONNECT_SSH_SUCCESS:
      return {
        ...state,
        sshStatus: "connected"
      };
    case types.CONNECT_SSH_FAIL:
      return {
        ...state,
        sshStatus: "failed",
        sshError: "",
        selectedEon: null
      };
    case types.SCAN_NETWORK:
      return {
        ...state,
        status: "scanning",
        scanning: true,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        progress: 0
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
    case types.CHECK_EON_STATUS:
      return {
        ...state,
        scanResults
      };
    case types.SELECT_EON:
      const eon = state.scanResults[action.payload.index];
      // console.warn("REDUCER SELECT_EON:",eon);
      settings.set('selectedEon', action.payload.index);
      return {
        ...state,
        status: "eon_selected",
        scanError: null,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        selectedEon: action.payload.index
      };
    case types.DESELECT_EON:
      // const eon = state.scanResults[action.payload.index];
      settings.set('selectedEon', null);
      return {
        ...state,
        status: "not_selected",
        scanError: null,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        selectedEon: null
      };
    case types.SCAN_NETWORK_SUCCESS:
      // console.log("REDUCER SCAN_NETWORK_SUCCESS:",action.payload.results);
      return {
        ...state,
        status: "scanned_has_results",
        scanResults: action.payload.results,
        scanning: false,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        progress: 0
      };
    case types.SCAN_NETWORK_FOUND:
      return {
        ...state,
        status: "scanned_has_results",
        newResults: action.payload.found,
        // scanResults: action.payload.results,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        scanning: false
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
    case types.SCAN_NETWORK_PROGRESS:
      return {
        ...state,
        progress: parseInt(action.payload.percentage)
      };
    case types.SCAN_NETWORK_NOT_FOUND:
      return {
        ...state,
        progress: 0,
        newResults: [],
        status: "scanned_no_results",
        scanning: false
      };
    default:
      return state;
  }
}
