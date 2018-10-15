import * as types from '../constants/car_state_action_types';
import settings from 'electron-settings';

const initialState = {
  gearShifter: null,
  seatbeltUnlatched: null,
  vEgoRaw: 0,
  vEgo: 0,
  brake: 0,
  gas: 0,
  steeringAngle: 0,
  wheelSpeedFL: null,
  wheelSpeedFR: null,
  wheelSpeedRL: null,
  wheelSpeedRR: null,
  doorOpen: null,
  steeringRate: 0.0,
  events: [],
  steeringPressed: null,
  cruiseAvailable: null,
  cruiseSpeed: null,
  cruiseSpeedOffset: null,
  cruiseEnabled: null,
  cruiseStandstill: null,
  yawRate: 0,
  steeringTorque: 0,
  genericToggle: null,
  buttonEvents: [],
  standstill: null,
  gasPressed: null,
  brakeLights: null,
  rightBlinker: null,
  leftBlinker: null,
  brakePressed: null,
  aEgo: 0,
  canMonoTimes: []
};

export default function carStateReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE:
      // console.log("actionPayload",action.payload);
      return {
        ...state,
        ...action.payload,
        wheelSpeedRL: action.payload.wheelSpeeds ? action.payload.wheelSpeeds.rl : null,
        wheelSpeedFR: action.payload.wheelSpeeds ? action.payload.wheelSpeeds.fr : null,
        wheelSpeedFL: action.payload.wheelSpeeds ? action.payload.wheelSpeeds.fl : null,
        wheelSpeedRR: action.payload.wheelSpeeds ? action.payload.wheelSpeeds.rr : null,
        cruiseAvailable: action.payload.cruiseState ? action.payload.cruiseState.available : null,
        cruiseSpeed: action.payload.cruiseState ? action.payload.cruiseState.speed : null,
        cruiseSpeedOffset: action.payload.cruiseState ? action.payload.cruiseState.speedOffset : null,
        cruiseEnabled: action.payload.cruiseState ? action.payload.cruiseState.enabled : null,
        cruiseStandstill: action.payload.cruiseState ? action.payload.cruiseState.standstill : null
      };
    default:
      return state;
  }
}