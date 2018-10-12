import * as types from '../constants/thermal_action_types';
import settings from 'electron-settings';

const initialState = {
  bat: null,
  batteryStatus: null,
  batteryCurrent: null,
  batteryVoltage: null,
  batteryPercent: null,
  chargerDisabled: null,
  usbOnline: null,
  freeSpace: null,
  mem: null,
  cpu3: null,
  cpu2: null,
  cpu1: null,
  cpu0: null,
  gpu: null,
  fanSpeed: null,
  started: null,
  startedTs: null,
  thermalStatus: null
};

export default function thermalReducer(state = initialState, action) {

  switch (action.type) {
    case types.UPDATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}