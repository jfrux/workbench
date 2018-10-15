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
    case types.CONNECT:
      return {
        ...state,
        connected: false,
        connecting: true
      };
    case types.CONNECTED:
      return {
        ...state,
        connected: true,
        connecting: false
      };
    case types.MESSAGE:
      return {
        ...state,
        ...action.payload,
        fingerprintFriendly: "[" + JSON.stringify(action.payload.fingerprint).replace(/"/g,'').replace(/:/g,': ') + "]",
        connected: true,
        connecting: false
      };
    case types.CONNECT_FAILED:
      return {
        ...state,
        currentStateKeys: [],
        service: null,
        health: null,
        thermal: null
      };
    case types.DISCONNECT:
      return {
        ...state,
        connected: false
      };
    case types.DISCONNECTED:
      return {
        ...state,
        connected: false
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
