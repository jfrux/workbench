import * as types from '../constants/eon_detail_action_types';
import settings from 'electron-settings';

const initialState = {
  gearShifter: null,
  seatbeltUnlatched: null,
  vEgoRaw: 0,
  brake: 0,
  vEgo: 0,
  steeringAngle: 0,
  leftBlinker: null,
  wheelSpeedRL: null,
  wheelSpeedFR: null,
  wheelSpeedFL: null,
  wheelSpeedRR: null,
  wheelSpeeds: {
    rl: 0,
    fr: 0,
    fl: 0,
    rr: 0
  },
  doorOpen: null,
  steeringRate: 0.0,
  events: [],
  steeringPressed: null,
  cruiseAvailable: null,
  cruiseSpeed: null,
  cruiseSpeedOffset: null,
  cruiseEnabled: null,
  cruiseStandstill: null,
  cruiseState: {
    available: null,
    speed: 0.0,
    speedOffset: 0,
    enabled: null,
    standstill: null
  },
  gas: 0,
  yawRate: 0,
  steeringTorque: 0,
  genericToggle: null,
  brakeLights: null,
  buttonEvents: [],
  standstill: null,
  gasPressed: null,
  rightBlinker: null,
  brakePressed: null,
  aEgo: 0,
  canMonoTimes: []
};

export default function carStateReducer(state = initialState, action) {
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