import settings from 'electron-settings';
const app = require('electron').remote.app;
const path = require("path");
import * as types from '../constants/eon_detail_action_types';
import * as eonListActions from './eon_list_actions';
import * as commands from '../constants/commands.json';
import * as regex from '../constants/tmux_regex';
const SSH = require('node-ssh');
import * as vehicle_connection_statuses from '../constants/vehicle_connection_statuses.json';
// ACTION CREATORS
let pollerId;
export function BEGIN_install() {
  // console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.INSTALL
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
  // console.log("dispatched BEGIN_scanNetwork");

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

const limitedLogArray = function(length) {
  var array = new Array();
  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }
    return Array.prototype.push.apply(this,arguments);
  };
  return array;
};
function testJSON(text){
  if (typeof text!=="string"){
      return false;
  }
  try{
      JSON.parse(text);
      return true;
  }
  catch (error){
      return false;
  }
}

export function OPEN_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE
  };
}
export function RESPONSE_REQUEST_EON_STATE(eonState, state) {
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
export function CLOSE_REQUEST_EON_STATE() {
  return {
    type: types.EON_STATE_CLOSE
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
      fingerprint: fingerprint,
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

// export function pipeTmux() {
//   return (dispatch, getState) => {
//     const { selectedEon, scanResults } = getState().eonList;
//     const eon = scanResults[selectedEon];
//     console.warn("pipeTmux to:",eon);
//     if (eon) {
//       dispatch(OPEN_REQUEST_EON_STATE());
//       dispatch(eonListActions.sendPiped(eon, commands.PIPE_TMUX, [], (resp) => {
//         dispatch(RESPONSE_REQUEST_EON_STATE(resp,getState()));
//       }, (err) => {
//         dispatch(FAIL_REQUEST_EON_STATE(err));
//       }));
//     }
//   }
// }

// export function pipeState() {
//   return (dispatch, getState) => {
//     const { selectedEon, scanResults } = getState().eonList;
//     const eon = scanResults[selectedEon];
//     console.warn("pipeState to:",eon);
//     if (eon) {
//       dispatch(OPEN_REQUEST_EON_STATE());
//       dispatch(eonListActions.sendCommand(eon, commands.PIPE_STATE, [], (resp) => {
//         dispatch(RESPONSE_REQUEST_EON_STATE(resp,getState()));
//       }, (err) => {
//         // dispatch(FAIL_REQUEST_EON_STATE(err));
//         console.warn("err:",err);
//       }));
//     }
//   }
// }
// export function closeTmux() {
//   return (dispatch, getState) => {
//     if (app && app.tmuxClient) {
//       app.tmuxClient.dispose();
//     }
//     dispatch(eonListActions.DESELECT_EON());
//     dispatch(CLOSE_REQUEST_EON_STATE());
//   }
// }
// export function installFork(fork) {
//   return (dispatch, getState) => {
//     dispatch(BEGIN_fetchPid());
//     eonListActions.sendCommand(selectedEon, commands.OPENPILOT_PID).then((result) => {
//       const pid = result.stdout.split('\n')[0].trim();
      
//       if (result.stderr) {
//         dispatch(FAIL_fetchPid(result.stderr));
//       } else {
//         if (pid && pid.length) {
//           dispatch(SUCCESS_fetchPid(pid));
//         } else {
//           dispatch(FAIL_fetchPid("Openpilot is not running, or too many processes were returned."));
//         }
//       }
//     });
//   }
// }

export function fetchFingerprint() {
  return (dispatch, getState) => {
    const { selectedEon, scanResults } = getState().eonList;
    const eon = scanResults[selectedEon];
    const { polling } = getState().eonDetail;
    setTimeout(() => {
      fetch(`http://${eon.ip}:8080/fingerprint.json`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          dispatch(RESPONSE_GET_FINGERPRINT(json, getState()));
          if (polling) {
            dispatch(fetchFingerprint());
          }
        }).catch((err) => {
          dispatch(FAIL_GET_FINGERPRINT(err));
          if (polling) {
            dispatch(fetchFingerprint());
          }
        });
    },2000);
  };
}

export function fetchEonState() {
  return (dispatch, getState) => {
    const { selectedEon, scanResults } = getState().eonList;
    const eon = scanResults[selectedEon];
    const { polling } = getState().eonDetail;
    setTimeout(() => {
      fetch(`http://${eon.ip}:8080/state.json`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          dispatch(RESPONSE_REQUEST_EON_STATE(json, getState()));
          if (polling) {
            dispatch(fetchEonState(eon));
          }
        }).catch((err) => {
          dispatch(FAIL_REQUEST_EON_STATE(err));
          if (polling) {
            dispatch(fetchEonState(eon));
          }
        });
    },2000);
  };
}
export function install() {
  return (dispatch, getState) => {
    const { selectedEon, scanResults } = getState().eonList;

    const eon = scanResults[selectedEon];
    console.warn("Starting Api install...");
    dispatch(BEGIN_install());
    dispatch(eonListActions.sendCommand(eon, commands.INSTALL_API, [], (resp) => {
      console.info("Installing...", resp);

      app.sshClient.dispose();
      dispatch(SUCCESS_install());
      dispatch(fetchEonState());
      dispatch(fetchFingerprint());
      
      console.warn("API Now Running on EON");
    }, (err) => {
      console.warn("Error was thrown while installing...");
    }));
    // app.installClient = new SSH();
    // dispatch(BEGIN_install());
  };
}

export function uninstall() {
  return (dispatch, getState) => {
    const { selectedEon, scanResults } = getState().eonList;
    console.warn("scanResults:",scanResults);
    console.warn("selectedEon:",selectedEon);
    const eon = scanResults[selectedEon];
    console.warn("Starting Api UNINSTALL...");
    dispatch(BEGIN_uninstall());
    dispatch(eonListActions.sendCommand(eon, commands.UNINSTALL_API, [], (resp) => {
      console.info("UNINSTALLING...", resp);
      app.sshClient.dispose();
      dispatch(SUCCESS_uninstall());
      
      console.warn("API Uninstalled");
    }, (err) => {
      console.warn("Error was thrown while installing...");
    }));
    // app.installClient = new SSH();
    // dispatch(BEGIN_install());
  };
}