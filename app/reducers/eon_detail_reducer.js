/* reducer for managing state for individual eon */
import * as types from '../constants/eon_detail_action_types';
import settings from 'electron-settings';

const defaultTmuxLogLength = 300;

const initialState = {
  activeTab: 'eon',
  updated: null,
  vehicleConnection: null,
  service: null,
  drives: null,
  devices: null,
  activeDrive: null,
  health: null,
  fingerprint: null,
  thermal: null,
  sshCommand: null,
  installing: false,
  installError: null,
  auth: null,
  currentStateKeys: [],
  stateRequestAttempts: 0,
  stateRequestFatal: false,
  workbenchInstalled: false,
  sshConnectionStatus: "not_connected",
  sshConnectionError: null,
  sshCurrentCommand: null,
  sshLog: [],
  sshCommandErrors: null,
  sshCommandStatus: "idle"
};

export default function eonDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case types.AUTH_REQUEST:
      return {
        ...state,
        requestingAuth: true
      };
    case types.AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        requestingAuth: false,
        auth: action.payload,
        authRequestError: null
      };
    case types.AUTH_REQUEST_FAIL:
      return {
        ...state,
        requestingAuth: false,
        authRequestError: action.payload
      };
    case types.API_REQUEST:
      return {
        ...state
      };
    case types.API_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case types.API_REQUEST_FAIL:
      return {
        ...state
      };
    case types.STOP_POLLING:
      return {
        ...state,
        polling: false,
        stateRequestAttempts: 0,
        stateRequestFatal: false,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null
      };
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
    case types.GET_FINGERPRINT:
      return {
        ...state
      };
    case types.GET_FINGERPRINT_RESPONSE:
      return {
        ...state,
        fingerprint: action.payload.fingerprint,
        fingerprintString: action.payload.fingerprintString
      };

    case types.GET_FINGERPRINT_FAIL:
      return {
        ...state,
        fingerprint: null
      };
    
    case types.GET_FINGERPRINT_CLOSE:
      return {
        ...state,
        fingerprint: null
      };
    case types.EON_STATE:
      return {
        ...state,
        tmuxAttached: false,
        stateRequestFatal: false,
        tmuxLog: []
      };
    case types.EON_STATE_RESPONSE:
      return {
        ...state,
        ...action.payload,
        tmuxAttached: true,
        stateRequestAttempts: 0,
        stateRequestFatal: false,
        tmuxError: null
      };

    case types.EON_STATE_FAIL:
      return {
        ...state,
        tmuxAttached: false,
        currentStateKeys: [],
        service: null,
        health: null,
        thermal: null,
        stateRequestAttempts: state.stateRequestAttempts+1,
        tmuxError: action.payload.error,
        tmuxLog: []
      };
    
      case types.EON_STATE_FATAL:
        return {
          ...state,
          tmuxAttached: false,
          currentStateKeys: [],
          service: null,
          health: null,
          thermal: null,
          tmuxLog: [],
          stateRequestFatal: true
        };
    
    case types.EON_STATE_CLOSE:
      return {
        ...state,
        tmuxAttached: false,
        tmuxError: null,
        tmuxLog: [],
        service: null,
        health: null,
        thermal: null,
        currentStateKeys: []
      };
    case types.INSTALL:
      return {
        ...state,
        installError: null,
        installing: true,
        sshCommand: `ssh root@${action.payload.ip} -p 8022 -i ~/.ssh/openpilot_rsa`
      };
    case types.INSTALL_SUCCESS:
      return {
        ...state,
        installing: false,
        polling: true
      };
    case types.INSTALL_FAIL:
      return {
        ...state,
        installing: false,
        installError: action.payload.err,
        polling: false
      };
    case types.UNINSTALL:
      return {
        ...state
      };
    case types.UNINSTALL_SUCCESS:
      return {
        ...state,
        polling: false
      };
    case types.UNINSTALL_FAIL:
      return {
        ...state,
        polling: false
      };
    case types.OPEN_DRIVE:
      return {
        ...state,
        activeDrive: action.payload
      };
    case types.CLOSE_DRIVE:
      return {
        ...state,
        activeDrive: null
      };
    default:
      return state;
  }
}
