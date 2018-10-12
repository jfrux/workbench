
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
  actuatorBrake: null,
  actuatorGas: null,
  actuatorSteerAngle: null,
  actuatorSteer: null,
  active: null,
  hudControlLeadVisible: null,
  hudControlSetSpeed: null,
  hudControlLanesVisible: null,
  hudControlVisualAlert: null,
  hudControlAudibleAlert: null,
  hudControlSpeedVisible: null,
  enabled: null
};

export default function carControlReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE:
      return {
        ...state,
        ...action.payload,
        hudControlLeadVisible: action.payload.hudControl ? action.payload.hudControl.leadVisible : null,
        hudControlSetSpeed: action.payload.hudControl ? action.payload.hudControl.setSpeed : null,
        hudControlLanesVisible: action.payload.hudControl ? action.payload.hudControl.lanesVisible : null,
        hudControlVisualAlert: action.payload.hudControl ? action.payload.hudControl.visualAlert : null,
        hudControlAudibleAlert: action.payload.hudControl ? action.payload.hudControl.audibleAlert : null,
        hudControlSpeedVisible: action.payload.hudControl ? action.payload.hudControl.speedVisible : null,
        actuatorBrake: action.payload.actuators ? action.payload.actuators.brake : null,
        actuatorGas: action.payload.actuators ? action.payload.actuators.gas : null,
        actuatorSteerAngle: action.payload.actuators ? action.payload.actuators.steerAngle : null,
        actuatorSteer: action.payload.actuators ? action.payload.actuators.steer : null,
        cruiseCancel: action.payload.cruiseControl ? action.payload.cruiseControl.cancel : null,
        cruiseOverride: action.payload.cruiseControl ? action.payload.cruiseControl.override : null,
        cruiseSpeedOverride: action.payload.cruiseControl ? action.payload.cruiseControl.speedOverride : null,
        cruiseAccelOverride: action.payload.cruiseControl ? action.payload.cruiseControl.accelOverride : null
      };
    default:
      return state;
  }
}