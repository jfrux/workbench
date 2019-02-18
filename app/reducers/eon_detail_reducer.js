/* reducer for managing state for individual eon */
import * as types from '../constants/eon_detail_action_types';
import settings from 'electron-settings';
import dataParams from '../constants/data_params';
import { ENDPOINTS } from '../constants/comma_endpoints';

const defaultTmuxLogLength = 300;

const initialState = {
  activeTab: 'androidLog',
  activeCommand: null,
  lastRunCommand: null,
  previousTab: null,
  updated: null,
  endpoints: ENDPOINTS,
  vehicleConnection: null,
  service: null,
  fileList: null,
  fileListLoading: true,
  fileContent: null,
  fileContentLoading: false,
  drives: null,
  devices: null,
  activeRouteId: null,
  activeRouteLoading: false,
  activeRouteError: false,
  activeDrive: null,
  health: null,
  fingerprint: null,
  thermal: null,
  sshCommand: null,
  installing: false,
  installError: null,
  auth: null,
  currentStateKeys: [],
  stateRequestAttempts: 0,
  stateRequestFatal: false,
  workbenchInstalled: false,
  messagesReceived: 0,
  dataParams,
  dataParamsLoading: false
};

export default function eonDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.REFRESH_FILE_LIST:
      return {
        ...state,
        fileList: null,
        fileListLoading: true
      };
    case types.REFRESH_FILE_LIST_SUCCESS:
      return {
        ...state,
        fileList: action.payload,
        fileListLoading: false
      };
    case types.CHANGE_TAB:
      return {
        ...state,
        activeCommand: null,
        previousTab: state.activeTab,
        activeTab: action.payload
      };
    case types.RUN_COMMAND:
      return {
        ...state,
        lastRunCommand: state.activeCommand,
        activeCommand: null
      };
    case types.SHOW_COMMAND:
      return {
        ...state,
        activeCommand: action.payload
      };
    case types.HIDE_ROUTE:
      return {
        ...state,
        activeRouteId: null,
        activeRouteLoading: false,
        activeRouteError: false
      };
    case types.SHOW_ROUTE:
      return {
        ...state,
        activeRouteId: action.payload,
        activeRouteLoading: true,
        activeRouteError: false
      };
    case types.SHOW_ROUTE_SUCCESS:
      return {
        ...state,
        activeRouteLoading: false,
        activeRouteError: false
      };
    case types.SHOW_ROUTE_FAILED:
      return {
        ...state,
        activeRouteLoading: false,
        activeRouteError: action.payload
      };
    case types.HIDE_COMMAND:
      return {
        ...state,
        activeCommand: null
      };
    case types.CONNECT:
      return {
        ...state,
        connected: false,
        connecting: true
      };
    case types.CONNECTED:
      return {
        ...state,
        connected: true,
        connecting: false
      };
    // case types.MESSAGE:
    //   return {
    //     ...state,
    //     ...action.payload,
    //     fingerprintFriendly: action.payload && action.payload.fingerprint ? "[" + JSON.stringify(action.payload.fingerprint).replace(/"/g,'').replace(/:/g,': ') + "]" : null,
    //     connected: true,
    //     messagesReceived: state.messagesReceived+1,
    //     connecting: false
    //   };
    case types.CONNECT_FAILED:
      return {
        ...state,
        currentStateKeys: [],
        service: null,
        health: null,
        thermal: null
      };
    case types.DISCONNECT:
      return {
        ...state,
        connected: false
      };
    case types.DISCONNECTED:
      return {
        ...state,
        connected: false
      };
    case types.HIDE_ROUTE:
      return {
        ...state,
        activeRouteId: null,
        activeRouteLoading: false
      };
    case types.FETCH_DATA_PARAMS:
      return {
        ...state,
        dataParamsLoading: true
      };
    case types.FETCH_DATA_PARAMS_SUCCESS:
      return {
        ...state,
        dataParams: action.payload,
        dataParamsLoading: false
      };
    case types.FETCH_DATA_PARAMS_FAILED:
      return {
        ...state,
        dataParams: action.payload.dataParams,
        dataParamsError: action.payload.error,
        dataParamsLoading: false
      };
    case types.FETCH_PROFILE:
      return {
        ...state,
        profile: {},
        profileLoading: true,
        profileError: false
      }
    case types.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false,
        profileError: false
      }
    case types.FETCH_PROFILE_FAILED:
      return {
        ...state,
        profile: {},
        profileLoading: false,
        profileError: action.payload
      }
    case types.FETCH_ROUTES:
      return {
        ...state,
        routes: {},
        routesLoading: true,
        routesError: false
      }
    case types.FETCH_ROUTES_SUCCESS:
      return {
        ...state,
        routes: action.payload,
        routesLoading: false,
        routesError: false
      }
    case types.FETCH_ROUTES_FAILED:
      return {
        ...state,
        routes: {},
        routesLoading: false,
        routesError: action.payload
      }
    case types.FETCH_DEVICES:
      return {
        ...state,
        devices: {},
        devicesLoading: true,
        devicesError: false
      }
    case types.FETCH_DEVICES_SUCCESS:
      return {
        ...state,
        devices: action.payload,
        devicesLoading: false,
        devicesError: false
      }
    case types.FETCH_DEVICES_FAILED:
      return {
        ...state,
        devices: {},
        devicesLoading: false,
        devicesError: action.payload
      }
    case types.FETCH_LOGS:
      return {
        ...state,
        logs: {},
        logsLoading: true,
        logsError: false
      }
    case types.FETCH_LOGS_SUCCESS:
      return {
        ...state,
        logs: action.payload,
        logsLoading: false,
        logsError: false
      }
    case types.FETCH_LOGS_FAILED:
      return {
        ...state,
        logs: {},
        logsLoading: false,
        logsError: action.payload
      }
    case types.FETCH_SEGMENTS:
      return {
        ...state,
        routes: {},
        routesLoading: true,
        routesError: false
      }
    case types.FETCH_SEGMENTS_SUCCESS:
      return {
        ...state,
        routes: action.payload.routesById,
        routesSorted: action.payload.routesSorted,
        routesLoading: false,
        routesError: false
      }
    case types.FETCH_SEGMENTS_FAILED:
      return {
        ...state,
        routes: {},
        routesLoading: false,
        routesError: action.payload
      }
    case types.FETCH_ANNOTATIONS:
      return {
        ...state,
        annotations: {},
        annotationsLoading: true,
        annotationsError: false
      }
    case types.FETCH_ANNOTATIONS_SUCCESS:
      return {
        ...state,
        annotations: action.payload,
        annotationsLoading: false,
        annotationsError: false
      }
    case types.FETCH_ANNOTATIONS_FAILED:
      return {
        ...state,
        annotations: {},
        annotationsLoading: false,
        annotationsError: action.payload
      }
    
    case types.FETCH_AUTH_FILE:
      return {
        ...state,
        auth: {},
        authLoading: true,
        authError: false
      }
    case types.FETCH_AUTH_FILE_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        authLoading: false,
        authError: false
      }
    case types.FETCH_AUTH_FILE_FAILED:
      return {
        ...state,
        auth: {},
        authLoading: false,
        authError: action.payload
      }

    case types.FETCH_ROUTE_FILE_LINKS:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.payload]: {
            ...state.routes[action.payload],
            fileLinksLoading: true,
            fileLinksError: false,
            fileLinks: {}
          }
        },
        
      }
    case types.FETCH_ROUTE_FILE_LINKS_SUCCESS:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.payload.routeId]: {
            ...state.routes[action.payload.routeId],
            fileLinksLoading: false,
            fileLinksError: false,
            fileLinks: action.payload.links
          }
        }
      }
    case types.FETCH_ROUTE_FILE_LINKS_FAILED:
      return {
        ...state,
        routes: {
          ...state.routes,
          [action.payload.routeId]: {
            ...[action.payload.routeId],
            fileLinksLoading: false,
            fileLinksError: action.payload,
            fileLinks: {}
          }
        }
      }
    default:
      return state;
  }
}
