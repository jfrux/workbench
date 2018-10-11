import * as types from '../constants/eon_detail_action_types';
import settings from 'electron-settings';

const initialState = {
  batteryStatus: null,
  freeSpace: null,
  bat: null,
  usbOnline: null,
  batteryCurrent: null,
  startedTs: null,
  mem: null,
  cpu2: null,
  cpu3: null,
  cpu0: null,
  cpu1: null,
  fanSpeed: null,
  batteryVoltage: null,
  started: null,
  chargerDisabled: null,
  batteryPercent: null,
  gpu: null,
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