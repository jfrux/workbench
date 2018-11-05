import * as types from '../constants/eon_detail_action_types';

export function CHANGE_TAB(tab) {
  return {
    type: types.CHANGE_TAB,
    payload: tab
  };
}

export function SHOW_COMMAND(tab) {
  return {
    type: types.SHOW_COMMAND,
    payload: tab
  };
}

export function HIDE_COMMAND() {
  return {
    type: types.HIDE_COMMAND
  };
}

export function RUN_COMMAND(command) {
  return {
    type: types.RUN_COMMAND,
    payload: command
  };
}