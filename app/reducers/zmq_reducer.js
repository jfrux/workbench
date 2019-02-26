/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/zmq_action_types';
import services from '../constants/service_list.yaml';

const initialState = {
  connected: false,
  data: {},
  services,
  serviceIds: Object.keys(services).sort()
};

const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;

export default function zmqReducer(state = initialState, action) {
  switch (action.type) {
    case types.MESSAGE:
      if (!state.paused) {
        return {
          ...state,
          data: {
            ...state.data,
            ...action.payload
          }
        };
      }
      return {
        ...state
      };
    case types.TOGGLE_PAUSE:
      return {
        ...state,
        paused: !state.paused
      };
    default:
      return state;
    }
}
