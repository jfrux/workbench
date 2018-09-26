/* reducer for managing state for individual eon */
import * as types from '../constants/eon_detail_action_types'
import settings from 'electron-settings';

const defaultTmuxLogLength = 300;

const initialState = {
  updated: null,
  vehicleConnection: null,
  service: null,
  health: null,
  thermal: null,
  currentStateKeys: []
};

export default function eonDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.EON_STATE:
      return {
        ...state,
        tmuxAttached: false,
        tmuxLog: []
      }
    case types.EON_STATE_RESPONSE:
    console.warn()
      return {
        ...state,
        ...action.payload,
        currentStateKeys: Object.keys(action.payload),
        tmuxAttached: true,
        tmuxError: null

      }

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
      }
    
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
      }

    case types.FETCH_PID:
      return {
        ...state,
        fetchingPid: true,
        pid: null
      }
    case types.FETCH_PID_SUCCESS:
      return {
        ...state,
        pid: action.payload.pid,
        pidError: null,
        fetchingPid: false
      }
    case types.FETCH_PID_FAIL:
      return {
        ...state,
        pid: null,
        pidError: action.payload.error,
        fetchingPid: false
      }
    case types.INSTALL:
      return {
        ...state
      }
    case types.INSTALL_SUCCESS:
      return {
        ...state,
        polling: true
      }
    case types.INSTALL_FAIL:
      return {
        ...state,
        polling: false
      }
    case types.UNINSTALL:
      return {
        ...state
      }
    case types.UNINSTALL_SUCCESS:
      return {
        ...state,
        polling: false
      }
    case types.UNINSTALL_FAIL:
      return {
        ...state,
        polling: false
      }
    default:
      return state;
  }
}
