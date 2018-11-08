import * as types from '../constants/network_scanner_action_types';
function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function BEGIN_scanNetwork() {
  return {
    type: types.SCAN_NETWORK
  };
}
export function PINGED_EONS() {
  return {
    type: types.PINGED_EONS
  };
}

export function updateScanCount(count) {
  return {
    type: types.SCAN_NETWORK_COUNT,
    payload: count
  };
}

export function PARTIALCOMPLETE_scanNetwork() {
  return {
    type: types.SCAN_NETWORK_PARTIAL_COMPLETE
  };
}
export function RESULT_scanNetwork(result) {
  let randomId = revisedRandId();
  let newEon = {}
  if (result.status !== "open") {
    // console.log(result.ip);
    return {
      type: types.SCAN_NETWORK_PROGRESS,
      payload: result
    };
  }

  
  // console.warn("OPEN " + result.ip,result);
  // newEon[randomId] = {
  //   ...result,
  //   id: randomId
  // }
  return {
    type: types.SCAN_NETWORK_RESULT,
    payload: result
  };
}

export function MAC_ADDRESS_REQUEST() {
  return {
    type: types.MAC_ADDRESS_REQUEST
  };
}

export function MAC_ADDRESS_SUCCESS(eon) {
  return {
    type: types.MAC_ADDRESS_SUCCESS,
    payload: {
      ...eon
    }
  };
}

export function MAC_ADDRESS_ERROR(error) {
  return {
    type: types.MAC_ADDRESS_ERROR,
    payload: {
      error
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

// COMPLETES THE SEARCH
export function ADD_TO_LIST(eon) {
  return {
    type: types.ADD_TO_LIST,
    payload: {
      ...eon
    }
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

export function REMOVE_SCANNED_RESULT(id) {
  return {
    type: types.REMOVE_SCANNED_RESULT,
    payload: {
      id
    }
  };
}
