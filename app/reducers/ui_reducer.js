/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/network_scanner_action_types';

const initialState = {
  terminalFontSize: '16px'
};

const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TERMINAL_FONT_SIZE:
      return {
        ...state,
        terminalFontSize: action.payload
      }
    default:
      return state;
    }
}