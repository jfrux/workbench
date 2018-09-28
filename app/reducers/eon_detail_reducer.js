/* reducer for managing state for individual eon */
import * as types from '../constants/eon_detail_action_types';
import settings from 'electron-settings';

const defaultTmuxLogLength = 300;

const initialState = {
  updated: null,
  vehicleConnection: null,
  service: null,
  health: null,
  fingerprint: null,
  thermal: null,
  currentStateKeys: []
};

export default function eonDetailReducer(state = initialState, action) {
  switch (action.type) {
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
        tmuxLog: []
      };
    case types.EON_STATE_RESPONSE:
      return {
        ...state,
        ...action.payload,
        currentStateKeys: Object.keys(action.payload),
        tmuxAttached: true,
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
        tmuxError: action.payload.error,
        tmuxLog: []
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
        ...state
      };
    case types.INSTALL_SUCCESS:
      return {
        ...state,
        polling: true
      };
    case types.INSTALL_FAIL:
      return {
        ...state,
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
    default:
      return state;
  }
}
