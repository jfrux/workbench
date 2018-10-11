import * as types from '../constants/car_control_action_types';

export function update(data) {
  return {
    type: types.UPDATE,
    payload: data
  }
};