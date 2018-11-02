/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/zmq_action_types';
const initialState = {
  connected: false,
  data: {}
};

const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;

export default function zmqReducer(state = initialState, action) {
  switch (action.type) {
    case types.MESSAGE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }
    // case types.SET_TERMINAL_FONT_SIZE:
    //   return {
    //     ...state,
    //     terminalFontSize: action.payload
    //   }
    default:
      return state;
    }
}