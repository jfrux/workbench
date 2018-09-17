import * as types from '../constants/connect_eon_types'

const initialState = {
  scanError: null,
  scanResults: null,
  scanning: false,
  selectedEon: null,
  status: "not_scanned"
};
export default function connectEon(state = initialState, action) {
  switch (action.type) {
    case types.SCAN_NETWORK:
      return {
        status: "scanning",
        scanning: true
      };
    case types.SELECT_EON:
      return {
        ...state,
        status: "eon_selected",
        // scanResults: [],
        scanError: null,
        status: "not_scanned",
        selectedEon: state.scanResults[action.payload.index]
      };
    case types.SCAN_NETWORK_SUCCESS:
      return {
        ...state,
        status: "scanned_has_results",
        scanResults: action.payload.results,
        scanning: false
      };
    case types.SCAN_NETWORK_FAIL:
      return {
        ...state,
        status: "scanned_error",
        scanError: action.payload.err,
        scanning: false
      };
    case types.SCAN_NETWORK_NOT_FOUND:
      return {
        ...state,
        status: "scanned_no_results",
        scanError: action.payload.err,
        scanning: false
      };
    default:
      return state;
  }
}
