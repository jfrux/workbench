import find from 'local-devices'
const netList = require('network-list');
const dns = require("dns"); 
import * as types from '../constants/connect_eon_types'

// ACTION CREATORS
export function BEGIN_scanNetwork() {
  console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.SCAN_NETWORK
  };
}

export function SUCCESS_scanNetwork(results) {
  return {
    type: types.SCAN_NETWORK_SUCCESS,
    payload: {
      results
    }
  };
}

export function FAIL_scanNetwork(err) {
  return {
    type: types.SCAN_NETWORK_FAIL,
    payload: {
      err
    }
  };
}

export function NO_FOUND_scanNetwork(err) {
  return {
    type: types.SCAN_NETWORK_NOT_FOUND,
    payload: {
      err
    }
  };
}


export function SELECT_EON(index) {
  return {
    type: types.SELECT_EON,
    payload: {
      index
    }
  };
}

// METHODS

export function scanNetwork() {
  return (dispatch, getState) => {
    dispatch(BEGIN_scanNetwork());
    console.warn("Starting scan...");
    return new Promise((resolve,reject) => {
      netList.scan({}, (err, arr) => {
        if(err!=null) {
          dispatch(FAIL_scanNetwork(err));
          return reject(err);
        }
        var aliveResults = arr.filter(item => item.alive);
        var eonResults = arr.filter(item => item.vendor === "OnePlus Technology (Shenzhen) Co., Ltd");
        console.warn(aliveResults);
        if (eonResults.length) {
          dispatch(SUCCESS_scanNetwork(eonResults));
        } else {
          dispatch(NO_FOUND_scanNetwork("Could not find EON on your network."))
        }
        resolve(aliveResults);
      });
    });
  };
}

export function selectEon(index) {
  return (dispatch, getState) => {
    dispatch(SELECT_EON(index));
  };
}
