import * as types from '../constants/ui_action_types';

export function SET_TERMINAL_FONT_SIZE(fontSize) {
  return {
    type: types.SET_TERMINAL_FONT_SIZE,
    payload: fontSize
  };
}
export function SET_STATE_LIST_DEPTH(depth) {
  console.warn("Setting depth to: ", depth);
  return {
    type: types.SET_STATE_LIST_DEPTH,
    payload: depth
  };
}