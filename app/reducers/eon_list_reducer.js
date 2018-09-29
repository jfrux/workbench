/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/eon_list_action_types';
import settings from 'electron-settings';

const initialState = {
  eons: {},
  selectedEon: null
};
export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_EON_STATUS:
      return {
        ...state,
        scanResults
      };
    case types.ADD_EON:
      return {
        ...state,
        eons: {
          ...state.eons,
          ...action.payload.eon
        }
      };
    case types.SELECT_EON:
      // const eon = state.scanResults[action.payload.index];
      // console.warn("REDUCER SELECT_EON:",eon);
      // settings.set('selectedEon', action.payload.index);
      return {
        ...state,
        // status: "eon_selected",
        // scanError: null,
        // sshConnectionStatus: "not_connected",
        // sshConnectionError: null,
        selectedEon: action.payload.index
      };
    case types.DESELECT_EON:
      // const eon = state.scanResults[action.payload.index];
      settings.set('selectedEon', null);
      return {
        ...state,
        status: "not_selected",
        scanError: null,
        sshConnectionStatus: "not_connected",
        sshConnectionError: null,
        selectedEon: null
      };
    default:
      return state;
  }
}
