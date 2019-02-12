import * as types from '../constants/terminal_action_types';
export function CONNECT(service) {
  return {
    type: types.CONNECT,
    payload: service
  };
}
export function DISCONNECT(service) {
  return {
    type: types.DISCONNECT,
    payload: service
  };
}
export function MESSAGE(data) {
  return {
    type: types.MESSAGE,
    payload: data
  };
}
export function ERROR(err) {
  return {
    type: types.ERROR,
    payload: err
  };
}
export function TOGGLE_PAUSE() {
  return {
    type: types.TOGGLE_PAUSE
  };
}
