
import * as types from '../constants/eon_list_action_types';

export function ADD_ERROR(error) {
  return {
    type: types.ADD_ERROR,
    payload: error
  };
}

export function RESET_ERROR() {
  return {
    type: types.RESET_ERROR
  };
}

export function ADD_EON(eon) {
  return {
    type: types.ADD_EON,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}

export function ADDING_EON(eon) {
  return {
    type: types.ADDING_EON,
    payload: eon
  };
}

export function ADD_EON_SUCCESS(eon) {
  console.warn("ADD_EON_SUCCESS:",eon);
  return {
    type: types.ADD_EON_SUCCESS,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}

export function ADD_EON_FAILED(eon, error) {
  return {
    type: types.ADD_EON_FAILED,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}

export function ADD_EON_ALREADY_EXISTS(eon) {
  return {
    type: types.ADD_EON_ALREADY_EXISTS,
    payload: {
      ...eon
    }
  };
}
export function REMOVE_UNRESOLVED_EON(removeId) {
  return {
    type: types.REMOVE_UNRESOLVED_EON,
    payload: removeId
  };
}

export function DO_PING_EON(eon) {
  return {
    type: types.DO_PING_EON,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}
export function PING_EON(eon) {
  return {
    type: types.PING_EON,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}
export function PING_EON_SUCCESS(eon) {
  return {
    type: types.PING_EON_SUCCESS,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}
export function PING_EON_FAILED(eon) {
  return {
    type: types.PING_EON_FAILED,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}

export function RESOLVED_EON(eon, mac) {
  let updatedEon = {};
  eon.addStatus = 1;
  eon.reachable = 1;
  eon.mac = mac;
  eon.id = mac;
  // updatedEon[eon.mac] = eon;
  
  return {
    type: types.RESOLVED_EON,
    payload: {
      id: eon.id,
      data: eon
    }
  };
}
export function UPDATE_UNRESOLVED(eon) {
  let updatedEon = {};
  return {
    type: types.UPDATE_UNRESOLVED,
    payload: {
      id: eon.id,
      data: eon
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

export function DESELECT_EON(index) {
  return {
    type: types.DESELECT_EON
  };
}

export function selectEon(eon) {
  return (dispatch, getState) => {
    console.log("Selecting eon",eon);
    dispatch(SELECT_EON(eon));
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
