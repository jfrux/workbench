import * as types from '../constants/eon_detail_action_types';

// ACTION CREATORS
let pollerId;

export function BEGIN_install(eon) {
  return {
    type: types.INSTALL,
    payload: eon
  };
}

export function SUCCESS_install() {
  return {
    type: types.INSTALL_SUCCESS
  };
}

export function FAIL_install(err) {
  return {
    type: types.INSTALL_FAIL,
    payload: {
      err
    }
  };
}

export function BEGIN_uninstall() {
  return {
    type: types.UNINSTALL
  };
}

export function SUCCESS_uninstall() {
  return {
    type: types.UNINSTALL_SUCCESS
  };
}

export function FAIL_uninstall(err) {
  return {
    type: types.UNINSTALL_FAIL,
    payload: {
      err
    }
  };
}

export function CHANGE_TAB(tab) {
  return {
    type: types.CHANGE_TAB,
    payload: tab
  };
}

// SSH ACTION CREATORS
export function BEGIN_connectSSH() {
  return {
    type: types.CONNECT_SSH
  };
}


export function SUCCESS_connectSSH() {
  return {
    type: types.CONNECT_SSH_SUCCESS
  };
}

export function FAIL_connectSSH(err) {
  return {
    type: types.CONNECT_SSH_FAIL,
    payload: {
      err
    }
  };
}

export function BEGIN_sshCommand() {
  return {
    type: types.SSH_COMMAND
  };
}

export function SUCCESS_sshCommand() {
  return {
    type: types.SSH_COMMAND_SUCCESS
  };
}

export function RESPONSE_sshCommand(stdout,stderr) {
  return {
    type: types.SSH_COMMAND_RESPONSE,
    payload: {
      stderr,
      stdout
    }
  };
}

export function STOP_POLLING() {
  return {
    type: types.STOP_POLLING
  };
}

export function FAIL_sshCommand(err) {
  return {
    type: types.SSH_COMMAND_FAIL,
    payload: {
      err
    }
  };
}

export function stopPolling() {
  dispatch(STOP_POLLING);
}