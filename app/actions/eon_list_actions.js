import path from 'path';
import fs from 'fs';
import settings from 'electron-settings';
import routes from '../constants/routes.json';
import * as types from '../constants/eon_list_action_types';
import * as networkActions from './network_connection_actions';

const app = require('electron').remote.app;
const SSH = require('node-ssh');
const RSAKey = require('rsa-key');
const mkdirp = require("mkdirp");

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function ADD_EON(eon) {
  let randomId = revisedRandId();
  let newEon = {
  }
  newEon[randomId] = {
    ...eon,
    id: randomId
  }
  return {
    type: types.ADD_EON,
    payload: {
      eon: newEon
    }
  }
}

export function SELECT_EON(index) {
  return {
    type: types.SELECT_EON,
    payload: {
      index
    }
  };
}

export function DESELECT_EON(index) {
  return {
    type: types.DESELECT_EON
  };
}

export function selectEon(eon) {
  return (dispatch, getState) => {
    dispatch(SELECT_EON(eon.id));
  };
}
export function checkExistingEONStatuses() {
  return (dispatch, getState) => {
    const { scanResults } = getState().eonList;
    scanResults.forEach((eon) => {
      //check if available.
      dispatch({
        type: types.CHECK_EON_STATUS,
        payload: {
          eon
        }
      });
      isPortReachable(8022, {
        host: eon.ip
      }).then(reachable => {
        if (reachable) {
          dispatch({
            type: types.CHECK_EON_STATUS_ONLINE,
            payload: {
              eon
            }
          });
        } else {
          dispatch({
            type: types.CHECK_EON_STATUS_OFFLINE,
            payload: {
              eon
            }
          });
        }
        //=> true
      });
    });
  };
}
export function retrieveEonFromSettings() {
  return (dispatch, getState) => {
    let scanResults = getState().eonList.scanResults;
    // let selectedEon = parseInt(settings.get("selectedEon")) || null;
    console.warn("Getting saved eons from settings...",scanResults);
    dispatch(resetScanNetwork());
    // dispatch(FOUND_scanNetwork());
    // if (scanResults && scanResults.length) {
    //   dispatch(SUCCESS_scanNetwork(scanResults,getState()));
    //   dispatch(selectEon(selectedEon));
    //   // if (selectedEon) {
    //   //   this.props.history.push(routes.EON_DETAIL);
    //   // }
    // }
  };
}
