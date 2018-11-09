/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/eon_list_action_types';
import settings from 'electron-settings';

const initialState = {
  unresolvedEons: {},
  eons: {},
  error: null,
  eonToAdd: null,
  addingEonError: null,
  addingEon: false,
  sshCommand: null,
  selectedEon: null
};
export default function eonListReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_EON_STATUS:
      return {
        ...state,
        scanResults
      };
    case types.ADD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case types.RESET_ERROR:
      return {
        ...state,
        error: null
      };
    case types.ADDING_EON:
      return {
        ...state,
        addingEon: true
      };
    case types.ADD_EON:
      return {
        ...state,
        addingEon: true,
        addingEonError: null,
        error: null,
        eonToAdd: {
          ...action.payload
        }
      };
    case types.ADD_EON_SUCCESS:
      let unresolveds = Object.assign({}, state.unresolvedEons, {
        [action.payload.id]: action.payload.data
      });
      return {
        ...state,
        addingEon: false,
        eonToAdd: null,
        addingEonError: null,
        error: null,
        unresolvedEons: unresolveds
      };
    case types.REMOVE_UNRESOLVED_EON:
      delete state.unresolvedEons[action.payload.id];  
      return {
        ...state
      };
    case types.ADD_EON_FAILED:
      return {
        ...state,
        addingEon: false,
        addingEonError: action.payload.error,
        eonToAdd: null
      };
    case types.CLEAR_UNRESOLVED_EONS:
      return {
        ...state,
        addingEon: false,
        eonToAdd: null,
        unresolvedEons: {}
      };
    case types.RESOLVED_EON:
      return {
        ...state,
        eons: {
          ...state.eons,
          [action.payload.id]: action.payload.data
        }
      };
    case types.UPDATE_UNRESOLVED:
      return {
        ...state,
        unresolvedEons: {
          ...state.unresolvedEons,
          [action.payload.id]: action.payload.data
        }
      };
    case types.PING_EON:
      return {
        ...state,
        eons: {
          ...state.eons,
          [action.payload.id]: {
            ...state.eons[action.payload.id],
            // reachable: 0,
            pinging: true
          }
        }
      };
    case types.PING_EON_SUCCESS:
      return {
        ...state,
        eons: {
          ...state.eons,
          [action.payload.id]: {
            ...state.eons[action.payload.id],
            reachable: 1,
            pinging: false
          }
        }
      };
    case types.PING_EON_FAILED:
      return {
        ...state,
        eons: {
          ...state.eons,
          [action.payload.id]: {
            ...state.eons[action.payload.id],
            reachable: 2,
            pinging: false
          }
        }
      };
    case types.SELECT_EON:
      // const eon = state.scanResults[action.payload.index];
      // console.warn("REDUCER SELECT_EON:",eon);
      // settings.set('selectedEon', action.payload.index);
      return {
        ...state,
        error: null,
        // status: "eon_selected",
        // scanError: null,
        // sshConnectionStatus: "not_connected",
        // sshConnectionError: null,
        sshCommand: `ssh root@${state.eons[action.payload.index].ip} -p 8022 -i ~/.ssh/openpilot_rsa`,
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
