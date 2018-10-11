import * as types from '../constants/car_state_action_types';

export function update(data) {
  return {
    type: types.UPDATE,
    payload: data
  }
}