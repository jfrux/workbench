
import * as types from '../constants/car_control_action_types';
import settings from 'electron-settings';

const initialState = {
  brakeDEPRECATED: null,
  gasDEPRECATED: null,
  steeringTorqueDEPRECATED: null,
  cruiseCancel: null,
  cruiseOverride: null,
  cruiseSpeedOverride: null,
  cruiseAccelOverride: null,
  cruiseControl: {
    cancel: null,
    override: null,
    speedOverride: null,
    accelOverride: null
  },
  actuatorBrake: null,
  actuatorGas: null,
  actuatorSteerAngle: null,
  actuatorSteer: null,
  actuators: {
    brake: null,
    gas: null,
    steerAngle: null,
    steer: null,
  },
  active: null,
  hudControlLeadVisible: null,
  hudControlSetSpeed: null,
  hudControlLanesVisible: null,
  hudControlVisualAlert: null,
  hudControlAudibleAlert: null,
  hudControlSpeedVisible: null,
  hudControl: {
    leadVisible: null,
    setSpeed: null,
    lanesVisible: null,
    visualAlert: null,
    audibleAlert: null,
    speedVisible: null,
  },
  enabled: null
};

export default function carControlReducer(state = initialState, action) {
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