import * as types from '../constants/connect_eon_types'
import settings from 'electron-settings';

const initialState = {
  scanError: null,
  scanResults: null,
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
export default function connectEon(state = initialState, action) {
  switch (action.type) {
    case types.CONNECT_SSH:
      return {
        sshStatus: "connecting"
      };
    case types.CONNECT_SSH_SUCCESS:
      return {
        sshStatus: "connected"
      };
    case types.CONNECT_SSH_FAIL:
      return {
        sshStatus: "failed",
        sshError: ""
      };
    case types.SSH_COMMAND:
      return {
        sshCommand: action.payload.command,
        sshCommandStatus: "executing"
      };
    case types.SSH_COMMAND_RESPONSE:
      return {
        sshCommand: action.payload.response,
        sshCommandStatus: "executing"
      };
    case types.SSH_COMMAND_COMPLETE:
      return {
        sshCommand: null,
        sshCommandStatus: "success"
      };
    case types.SSH_COMMAND_FAIL:
      return {
        sshCommand: null,
        sshCommandStatus: "failed",
        sshCommandError: action.payload.error
      };
    case types.CONNECT_SSH_SUCCESS:
      return {
        sshStatus: "connected"
      };
    case types.CONNECT_SSH_FAIL:
      return {
        sshStatus: "failed",
        sshError: ""
      };
    case types.SCAN_NETWORK:
      return {
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
