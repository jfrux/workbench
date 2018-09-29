import * as types from '../constants/network_scanner_action_types';

// STARTS THE SEARCH
export function BEGIN_scanNetwork() {
  // console.log("dispatched BEGIN_scanNetwork");

  return {
    type: types.SCAN_NETWORK
  };
}

export function RESULT_scanNetwork(result,state) {
  // console.log(result);
  if (result.status !== 'open') {
    result = null;
  } else {
    result = {
      ip: "",
      mac: ""
    }
  }
  return {
    type: types.SCAN_NETWORK_RESULT,
    payload: {
      ...result
    }
  };
}

export function PROGRESS_scanNetwork() {
  return {
    type: types.SCAN_NETWORK_PROGRESS,
  };
}

// SUCCESSFUL SCAN
export function SUCCESS_scanNetwork(results,state) {
  return {
    type: types.SCAN_NETWORK_SUCCESS,
    payload: {
      results
    }
  };
}

export function FOUND_scanNetwork(foundResults,state) {
  return {
    type: types.SCAN_NETWORK_FOUND,
    payload: {
      found: foundResults
    }
  };
}

export function NOT_FOUND_scanNetwork() {
  // settings.set("scanResults",results);
  console.warn("DISPATCHING");
  return {
    type: types.SCAN_NETWORK_NOT_FOUND,
  };
}

// COMPLETES THE SEARCH
export function COMPLETE_scanNetwork() {
  return {
    type: types.SCAN_NETWORK_COMPLETE
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

export function resetScanNetwork() {
  return {
    type: types.SCAN_NETWORK_RESET
  };
}
