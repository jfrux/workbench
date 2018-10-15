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

// AUTH REQUEST
export function AUTH_REQUEST() {
  return {
    type: types.AUTH_REQUEST
  };
}
export function AUTH_REQUEST_SUCCESS(authResponse) {
  authResponse.commaUser = JSON.parse(authResponse.commaUser);
  authResponse.googleUser = JSON.parse(authResponse.googleUser);
  return {
    type: types.AUTH_REQUEST_SUCCESS,
    payload: authResponse
  };
}
export function AUTH_REQUEST_FAIL(error) {
  return {
    type: types.AUTH_REQUEST_FAIL,
    payload: {
      error
    }
  };
}

// DRIVE MODAL
export function OPEN_DRIVE(driveIndex) {
  return {
    type: types.OPEN_DRIVE,
    payload: driveIndex
  };
}
export function CLOSE_DRIVE() {
  return {
    type: types.CLOSE_DRIVE
  };
}
// ROUTES REQUEST
export function API_REQUEST(endpoint) {
  return {
    type: types.API_REQUEST
  };
}
export function API_REQUEST_SUCCESS(endpoint, json) {
  let payload = {};
  let endpointCheck = JSON.parse(JSON.stringify(endpoint));
  // console.warn("endpointCheck:",endpointCheck);
  if (endpointCheck === 'drives') {
    endpoint = 'routes';
  }
  let hasOwnKey = Object.keys(json).includes(endpoint);
  // console.warn("Has Own Key:",hasOwnKey);
  if (hasOwnKey) {
    payload[endpointCheck] = json[endpoint];
  } else {
    payload[endpointCheck] = json;
  }
  return {
    type: types.API_REQUEST_SUCCESS,
    payload
  };
}
export function API_REQUEST_FAIL(endpoint, error) {
  return {
    type: types.API_REQUEST_FAIL,
    payload: {
      endpoint,
      error
    }
  };
}

export function FATAL_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE_FATAL
  };
}
export function CLOSE_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE_CLOSE
  };
}

export function OPEN_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE
  };
}
export function RESPONSE_REQUEST_EON_STATE(eonState, state) {
  // console.warn(eonState);
  return {
    type: types.EON_STATE_RESPONSE,
    payload: eonState
  };
}
export function FAIL_REQUEST_EON_STATE(error) {
  return {
    type: types.EON_STATE_FAIL,
    payload: {
      error
    }
  };
}

export function GET_FINGERPRINT() {
  return {
    type: types.GET_FINGERPRINT
  };
}
export function RESPONSE_GET_FINGERPRINT(fingerprint, state) {
  // console.warn("fingerprint",fingerprint);
  return {
    type: types.GET_FINGERPRINT_RESPONSE,
    payload: {
      // fingerprint: fingerprint,
      fingerprintString: "[{\n" + Object.keys(fingerprint).sort((a, b) => { return parseInt(a)-parseInt(b);}).map((key) => { let fgpiece = fingerprint[key]; return `${key}: ${fgpiece}`;}).join(", ") + "\n}]"
    }
  };
}
export function FAIL_GET_FINGERPRINT(error) {
  return {
    type: types.GET_FINGERPRINT_FAIL,
    payload: {
      error
    }
  };
}
export function CLOSE_GET_FINGERPRINT() {
  return {
    type: types.GET_FINGERPRINT_CLOSE
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