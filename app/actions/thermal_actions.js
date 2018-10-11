import * as types from '../constants/thermal_action_types';

export function update(data) {
  return {
    type: types.UPDATE,
    payload: data
  }
};