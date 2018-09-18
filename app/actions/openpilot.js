import settings from 'electron-settings';
const app = require('electron').remote.app
import * as types from '../constants/openpilot_types'
import * as connectEonActions from './connect_eon';
import * as commands from '../constants/commands.json';
import * as regex from '../constants/tmux_regex';
import * as vehicle_connection_statuses from '../constants/vehicle_connection_statuses.json';
// ACTION CREATORS
export function BEGIN_install() {
  console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.INSTALL
  };
}

export function SUCCESS_install(results) {
  return {
    type: types.INSTALL_SUCCESS,
    payload: {
      results
    }
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

export function OPEN_tmuxPipe() {
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

export function RESPONSE_tmuxPipe(lines, state) {
  let newArray = limitedLogArray(state.openpilot.tmuxLogLimit);
  let regexKeys;
  let payload = {};
  let m;
  if (!state.openpilot.tmuxStartedAt) {
    payload.tmuxStartedAt = new Date();
  }
  state.openpilot.tmuxLog.forEach((item) => {
    newArray.push(item.trim());
  });

  regexKeys = Object.keys(regex);
  regexKeys.forEach((key) => {
    // console.log(key);
    if ((m = regex[key].exec(lines)) !== null) {
      // console.log(m);
      if (key === 'PROCESS') {
        payload[m[1]] = m[3];
      } else if (key === 'VEHICLE_CONNECTION') {
        payload.vehicleConnection = m[0];
      }
    }
  });

  newArray.push(lines);
  
  payload.tmuxLog = newArray;

  return {
    type: types.TMUX_PIPE_RESPONSE,
    payload
  };
}

export function FAIL_tmuxPipe(error) {
  return {
    type: types.TMUX_PIPE_FAIL,
    payload: {
      error
    }
  };
}

export function CLOSE_tmuxPipe() {
  return {
    type: types.TMUX_PIPE_CLOSE
  };
}

export function pipeTmux() {
  return (dispatch, getState) => {
    const { selectedEon } = getState().connectEon;
    if (selectedEon) {
      dispatch(OPEN_tmuxPipe());
      dispatch(connectEonActions.sendPiped(selectedEon, commands.PIPE_TMUX, [], (resp) => {
        dispatch(RESPONSE_tmuxPipe(resp,getState()));
      }, (err) => {
        dispatch(FAIL_tmuxPipe(err));
      }));
    }
  }
}

export function closeTmux() {
  return (dispatch, getState) => {
    if (app && app.tmuxClient) {
      app.tmuxClient.dispose();
    }
    dispatch(CLOSE_tmuxPipe());
  }
}

export function getOpenpilotPid() {
  return (dispatch, getState) => {
    const { selectedEon } = getState().connectEon;
    dispatch(BEGIN_fetchPid());
    connectEonActions.sendCommand(selectedEon, commands.OPENPILOT_PID).then((result) => {
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

export function install() {
  return (dispatch, getState) => {
    // dispatch(BEGIN_install());
    connectEonActions.sendCommand(getState())

    console.warn("Starting install...");
    // ssh.exec('echo "Node.js"', {
    //     out: console.log.bind(console)
    // })
    // .exec('echo "is"', {
    //     out: console.log.bind(console)
    // })
    // .exec('echo "awesome!"', {
    //     out: console.log.bind(console)
    // })
    // .start();
    // return new Promise((resolve,reject) => {
      
    // });
  };
}