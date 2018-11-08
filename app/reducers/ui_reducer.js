/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/ui_action_types';

const initialState = {
  appReady: false,
  terminalFontSize: '16px',
  stateListDepth: 1
};

const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.APP_READY:
      return {
        ...state,
        appReady: true
      }
    case types.SET_TERMINAL_FONT_SIZE:
      return {
        ...state,
        terminalFontSize: action.payload
      }
    case types.SET_STATE_LIST_DEPTH:
      console.warn("Set depth to: ", action.payload);
      return {
        ...state,
        stateListDepth: action.payload
      }
    default:
      return state;
    }
}