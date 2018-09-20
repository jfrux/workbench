/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/eon_list_action_types'
import settings from 'electron-settings';

const initialState = {
  scanError: null,
  scanResults: [],
  scanning: false,
  selectedEon: null,
  status: "not_scanned",
  sshConnectionStatus: "not_connected",
  sshConnectionError: null,
  sshCurrentCommand: null,
  sshLog: [],
  sshCommandErrors: null,
  sshCommandStatus: "idle"
};

export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    /* SSH Connections might should be moved to EON reducer */
    case types.CONNECT_SSH:
      return {
        ...state,
        sshStatus: "connecting"
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
        sshError: ""
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
        sshError: ""
      };
    case types.SCAN_NETWORK:
      return {
        ...state,
        status: "scanning",
        scanning: true
      };
    case types.SELECT_EON:
      const eon = state.scanResults[action.payload.index]
      settings.set('selectedEon', eon)
      return {
        ...state,
        status: "eon_selected",
        // scanResults: [],
        scanError: null,
        selectedEon: eon
      };
    case types.SCAN_NETWORK_SUCCESS:
      return {
        ...state,
        status: "scanned_has_results",
        scanResults: action.payload.results,
        scanning: false
      };
    case types.SCAN_NETWORK_FOUND:
      return {
        ...state,
        status: "scanned_has_results",
        scanResults: action.payload.results,
        scanning: true
      };
    case types.SCAN_NETWORK_FAIL:
      return {
        ...state,
        status: "scanned_error",
        scanError: action.payload.err,
        scanning: false
      };
    case types.SCAN_NETWORK_NOT_FOUND:
      return {
        ...state,
        status: "scanned_no_results",
        scanError: action.payload.err,
        scanning: false
      };
    default:
      return state;
  }
}
