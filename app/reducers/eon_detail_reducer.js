/* reducer for managing state for individual eon */
import * as types from '../constants/eon_detail_action_types'
import settings from 'electron-settings';

const defaultTmuxLogLength = 300;

const initialState = {
  pid: null,
  fetchingPid: false,
  tmuxLogLimit: defaultTmuxLogLength,
  tmuxError: null,
  tmuxLog: [],
  updated: null,
  logcatd: null,
  pandad: null,
  thermald: null,
  ui: null,
  uploader: null,
  tombstoned: null,
  logmessaged: null,
  controlsd: null,
  visiond: null,
  tmuxStartedAt: null,
  gpsd: null,
  vehicleConnection: null,
  logMonoTime: null,
  thermal: null,
  cpu0: null,
  cpu1: null,
  cpu2: null,
  cpu3: null,
  mem: null,
  gpu: null,
  bat: null,
  freeSpace: null,
  batteryPercent: null,
  batteryStatus: null,
  fanSpeed: null,
  started: null,
  usbOnline: null,
  startedTs: null,
  thermalStatus: null,
  batteryCurrent: null,
  batteryVoltage: null
};

export default function eonDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.TMUX_PIPE:
      return {
        ...state,
        tmuxAttached: false,
        tmuxLog: []
      }
    case types.TMUX_PIPE_RESPONSE:
      return {
        ...state,
        ...action.payload,
        tmuxAttached: true,
        tmuxError: null

      }

    case types.TMUX_PIPE_FAIL:
      return {
        ...state,
        tmuxAttached: false,
        tmuxError: action.payload.error,
        tmuxLog: []
      }
    
    case types.TMUX_PIPE_CLOSE:
      return {
        ...state,
        tmuxAttached: false,
        tmuxError: null,
        tmuxLog: [],
        updated: null,
        logcatd: null,
        pandad: null,
        thermald: null,
        ui: null,
        uploader: null,
        tombstoned: null,
        logmessaged: null,
        controlsd: null,
        visiond: null,
        gpsd: null,
        vehicleConnection: null,
        tmuxStartedAt: null,
        logMonoTime: null,
        thermal: null,
        cpu0: null,
        cpu1: null,
        cpu2: null,
        cpu3: null,
        mem: null,
        gpu: null,
        bat: null,
        freeSpace: null,
        batteryPercent: null,
        batteryStatus: null,
        fanSpeed: null,
        started: null,
        usbOnline: null,
        startedTs: null,
        thermalStatus: null,
        batteryCurrent: null,
        batteryVoltage: null
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
    default:
      return state;
  }
}
