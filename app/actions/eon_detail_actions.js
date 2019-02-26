import * as types from '../constants/eon_detail_action_types';

// export function CONNECT() {
//   return {
//     type: types.CONNECT
//   };
// }
// export function CONNECTED() {
//   return {
//     type: types.CONNECTED
//   };
// }
// export function CONNECT_FAILED() {
//   return {
//     type: types.CONNECT_FAILED
//   };
// }
export function CHANGE_TAB(tab) {
  return {
    type: types.CHANGE_TAB,
    payload: tab
  };
}

export function SHOW_COMMAND(tab) {
  return {
    type: types.SHOW_COMMAND,
    payload: tab
  };
}
export function BOOTSTRAP_EON() {
  return {
    type: types.BOOTSTRAP_EON
  }
}
export function HIDE_COMMAND() {
  return {
    type: types.HIDE_COMMAND
  };
}

export function RUN_COMMAND(command) {
  return {
    type: types.RUN_COMMAND,
    payload: command
  };
}

export function FETCH_DATA_PARAMS() {
  return {
    type: types.FETCH_DATA_PARAMS
  };
}
export function FETCH_DATA_PARAMS_SUCCESS(dataParams) {
  return {
    type: types.FETCH_DATA_PARAMS_SUCCESS,
    payload: dataParams
  };
}

export function FETCH_DATA_PARAMS_FAILED(error) {
  return {
    type: types.FETCH_DATA_PARAMS_FAILED,
    payload: error
  };
}

/**
 * PROFILE
 */
export function FETCH_PROFILE() {
  return {
    type: types.FETCH_PROFILE
  }
}
export function FETCH_PROFILE_SUCCESS(results) {
  return {
    type: types.FETCH_PROFILE_SUCCESS,
    payload: results
  }
}
export function FETCH_PROFILE_FAILED(error) {
  return {
    type: types.FETCH_PROFILE_FAILED,
    payload: error
  }
}

/**
 * ROUTES
 */
export function FETCH_ROUTES() {
  return {
    type: types.FETCH_ROUTES
  }
}
export function FETCH_ROUTES_SUCCESS(results) {
  return {
    type: types.FETCH_ROUTES_SUCCESS,
    payload: results
  }
}
export function FETCH_ROUTES_FAILED(error) {
  return {
    type: types.FETCH_ROUTES_FAILED,
    payload: error
  }
}

/**
 * DEVICES
 */
export function FETCH_DEVICES() {
  return {
    type: types.FETCH_DEVICES
  }
}
export function FETCH_DEVICES_SUCCESS(results) {
  return {
    type: types.FETCH_DEVICES_SUCCESS,
    payload: results
  }
}
export function FETCH_DEVICES_FAILED(error) {
  return {
    type: types.FETCH_DEVICES_FAILED,
    payload: error
  }
}

/**
 * LOGS
 */
export function FETCH_LOGS() {
  return {
    type: types.FETCH_LOGS
  }
}
export function FETCH_LOGS_SUCCESS(results) {
  return {
    type: types.FETCH_LOGS_SUCCESS,
    payload: results
  }
}
export function FETCH_LOGS_FAILED(error) {
  return {
    type: types.FETCH_LOGS_FAILED,
    payload: error
  }
}

/**
 * SEGMENTS
 */
export function FETCH_SEGMENTS(startTime,endTime) {
  return {
    type: types.FETCH_SEGMENTS,
    payload: {
      startTime,endTime
    }
  };
}
export function FETCH_SEGMENTS_SUCCESS(routesById, routesSorted) {
  return {
    type: types.FETCH_SEGMENTS_SUCCESS,
    payload: {
      routesById, routesSorted
    }
  }
}
export function FETCH_SEGMENTS_FAILED(error) {
  return {
    type: types.FETCH_SEGMENTS_FAILED,
    payload: error
  }
}

/**
 * ANNOTATIONS
 */
export function FETCH_ANNOTATIONS() {
  return {
    type: types.FETCH_ANNOTATIONS
  }
}
export function FETCH_ANNOTATIONS_SUCCESS(results) {
  return {
    type: types.FETCH_ANNOTATIONS_SUCCESS,
    payload: results
  }
}
export function FETCH_ANNOTATIONS_FAILED(error) {
  return {
    type: types.FETCH_ANNOTATIONS_FAILED,
    payload: error
  }
}

/**
 * AUTH FILE
 */
export function FETCH_AUTH_FILE() {
  return {
    type: types.FETCH_AUTH_FILE
  }
}
export function FETCH_AUTH_FILE_SUCCESS(results) {
  return {
    type: types.FETCH_AUTH_FILE_SUCCESS,
    payload: results
  }
}
export function FETCH_AUTH_FILE_FAILED(error) {
  return {
    type: types.FETCH_AUTH_FILE_FAILED,
    payload: error
  }
}

/**
 * route files
 */
export function FETCH_ROUTE_FILES() {
  return {
    type: types.FETCH_ROUTE_FILES
  }
}
export function FETCH_ROUTE_FILES_SUCCESS(results) {
  return {
    type: types.FETCH_ROUTE_FILES_SUCCESS,
    payload: results
  }
}
export function FETCH_ROUTE_FILES_FAILED(error) {
  return {
    type: types.FETCH_ROUTE_FILES_FAILED,
    payload: error
  }
}

/**
 * route file links
 */
export function FETCH_ROUTE_FILE_LINKS(routeId) {
  return {
    type: types.FETCH_ROUTE_FILE_LINKS,
    payload: routeId
  }
}

export function FETCH_ROUTE_FILE_LINKS_SUCCESS(routeId, results) {
  return {
    type: types.FETCH_ROUTE_FILE_LINKS_SUCCESS,
    payload: {
      routeId,
      links: results
    }
  }
}

export function FETCH_ROUTE_FILE_LINKS_FAILED(error) {
  return {
    type: types.FETCH_ROUTE_FILE_LINKS_FAILED,
    payload: error
  }
}

export function HIDE_ROUTE() {
  return {
    type: types.HIDE_ROUTE
  }
}

export function SHOW_ROUTE(routeId) {
  return {
    type: types.SHOW_ROUTE,
    payload: routeId
  }
}

export function SHOW_ROUTE_SUCCESS(routeId) {
  return {
    type: types.SHOW_ROUTE_SUCCESS,
    payload: routeId
  }
}
export function SHOW_ROUTE_FAILED(e) {
  return {
    type: types.SHOW_ROUTE_FAILED,
    payload: e
  }
}

export function SHOW_EON(eonId) {
  return {
    type: types.SHOW_EON,
    payload: eonId
  }
}

export function SHOW_EON_SUCCESS(eonId) {
  return {
    type: types.SHOW_EON_SUCCESS,
    payload: eonId
  }
}
export function SHOW_EON_FAILED(e) {
  return {
    type: types.SHOW_EON_FAILED,
    payload: e
  }
}

export function DOWNLOAD_ROUTE(eonId) {
  return {
    type: types.DOWNLOAD_ROUTE,
    payload: eonId
  }
}

export function DOWNLOAD_ROUTE_SUCCESS(eonId) {
  return {
    type: types.DOWNLOAD_ROUTE_SUCCESS,
    payload: eonId
  }
}
export function DOWNLOAD_ROUTE_FAILED(e) {
  return {
    type: types.DOWNLOAD_ROUTE_FAILED,
    payload: e
  }
}

export function DOWNLOAD_SEGMENT(eonId) {
  return {
    type: types.DOWNLOAD_SEGMENT,
    payload: eonId
  }
}

export function DOWNLOAD_SEGMENT_SUCCESS(eonId) {
  return {
    type: types.DOWNLOAD_SEGMENT_SUCCESS,
    payload: eonId
  }
}
export function DOWNLOAD_SEGMENT_FAILED(e) {
  return {
    type: types.DOWNLOAD_SEGMENT_FAILED,
    payload: e
  }
}
