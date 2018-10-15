import * as types from '../constants/system_action_types';

export function update(data) {
  return {
    type: types.UPDATE,
    payload: data
  }
}