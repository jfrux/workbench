import settings from 'electron-settings';
const app = require('electron').remote.app
const path = require("path");
import * as types from '../constants/eon_detail_action_types'
import * as eonListActions from './eon_list_actions';
import * as commands from '../constants/commands.json';
import * as regex from '../constants/tmux_regex';
const SSH = require('node-ssh');
import * as vehicle_connection_statuses from '../constants/vehicle_connection_statuses.json';
// ACTION CREATORS
let pollerId;
export function BEGIN_install() {
  console.log("dispatched BEGIN_scanNetwork");

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

export function BEGIN_fetchPid() {
  return {
    type: types.FETCH_PID
  };
}

export function SUCCESS_fetchPid(results) {
  return {
    type: types.FETCH_PID_SUCCESS,
    payload: {
      pid: results
    }
  };
}

export function FAIL_fetchPid(error) {
  return {
    type: types.FETCH_PID_FAIL,
    payload: {
      error
    }
  };
}

export function OPEN_REQUEST_EON_STATE() {
  return {
    type: types.TMUX_PIPE
  };
}

const limitedLogArray = function(length) {
  var array = new Array();
  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }
    return Array.prototype.push.apply(this,arguments);
  }
  return array;
}
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
export function RESPONSE_REQUEST_EON_STATE(eonState, state) {
  // const { eonDetail } = state;
  // const { tmuxLogLimit, tmuxLog, tmuxStartedAt } = eonDetail;
  // let newArray = limitedLogArray(tmuxLogLimit);
  // let regexKeys;
  // let payload = {};
  // let m;
  // let jsonLines = lines.split('\n');
  // jsonLines.forEach((line) => {
  //   if (testJSON(line)) {
  //     // console.log(line + '\n');
  //     let jsonResp = JSON.parse(line);
  //     console.warn("Received: ", Object.keys(jsonResp)[0]);
  //     payload = {
  //       ...payload,
  //       ...jsonResp
  //     }
  //   }
  // })

  // if (!tmuxStartedAt) {
  //   payload.tmuxStartedAt = new Date();
  // }
  return {
    type: types.TMUX_PIPE_RESPONSE,
    payload: eonState
  };
}

export function FAIL_REQUEST_EON_STATE(error) {
  return {
    type: types.TMUX_PIPE_FAIL,
    payload: {
      error
    }
  };
}

export function CLOSE_REQUEST_EON_STATE() {
  return {
    type: types.TMUX_PIPE_CLOSE
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
export function installFork(fork) {
  return (dispatch, getState) => {
    dispatch(BEGIN_fetchPid());
    eonListActions.sendCommand(selectedEon, commands.OPENPILOT_PID).then((result) => {
      const pid = result.stdout.split('\n')[0].trim();
      
      if (result.stderr) {
        dispatch(FAIL_fetchPid(result.stderr));
      } else {
        if (pid && pid.length) {
          dispatch(SUCCESS_fetchPid(pid));
        } else {
          dispatch(FAIL_fetchPid("Openpilot is not running, or too many processes were returned."));
        }
      }
    });
  }
}
// export function getOpenpilotPid() {
//   return (dispatch, getState) => {
//     const { selectedEon } = getState().connectEon;
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

const createPoller = (interval, initialDelay) => {
  console.warn("createPoller", interval, initialDelay);
  pollerId = null;
  let poller = () => {};
  return fn => {
    poller = () => {
      pollerId = window.setTimeout(poller, interval);
      return fn();
    };
    if (initialDelay) {
      return pollerId = window.setTimeout(poller, interval);
    }
    return poller();
  };
};

export const createPollingAction = (action, interval, initialDelay) => {
  const poll = createPoller(action, initialDelay);
  console.warn("createPollingAction");
  return () => (dispatch, getState) => poll(() => action(dispatch, getState));
};
export function fetchEonState(eon) {
  return (dispatch, getState) => {
    fetch(`http://${eon.ip}:8080/state`)
      .then(res => {
        console.warn("Response received...",res);
        return res.json()
      })
      .then(json => {
        console.warn("JSON parsed...",json);
        dispatch(RESPONSE_REQUEST_EON_STATE(json, getState()))
      }).catch((err) => {
        dispatch(FAIL_REQUEST_EON_STATE(err))
      });
  }
}
export function install(eon) {
  return (dispatch, getState) => {
    const { selectedEon, scanResults } = getState().eonList;

    const eon = scanResults[selectedEon];
    console.warn("Starting Api install...");
    dispatch(BEGIN_install());
    dispatch(eonListActions.sendCommand(eon, commands.INSTALL_API, [], (resp) => {
      console.info("Installing...", resp);

      app.sshClient.dispose();
      dispatch(SUCCESS_install());
      setTimeout(() => {
        dispatch(fetchEonState(eon));
      },2500)
      
      console.warn("API Now Running on EON");
    }, (err) => {
      console.warn("Error was thrown while installing...")
    }));
    // app.installClient = new SSH();
    // dispatch(BEGIN_install());
  };
}
export function uninstall() {
  return (dispatch, getState) => {
    // dispatch(BEGIN_install());
    // dispatch(eonListActions.sendCommand(eon, commands.INSTALL_API, [], (resp) => {
    //   console.info("Installing...", resp);

    //   app.sshClient.dispose();
    //   dispatch(SUCCESS_install());
    // }, (err) => {
    //   console.warn("Error was thrown while installing...")
    // }));
    // console.warn("Starting Api install...");
    // app.installClient = new SSH();
    // dispatch(BEGIN_install());
    
  };
}