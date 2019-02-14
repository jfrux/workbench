/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/file_list_action_types';
import settings from 'electron-settings';

const initialState = {
  isVisible: {},
  openedDirectories: {},
  openedFiles: {},
  filesByPath: {},
  activeFile: null
};
export default function fileListReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: {
          ...state.isVisible,
          [action.payload]: !state.isVisible[action.payload]
        }
      };
    case types.FETCH_DIRECTORY_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        filesByPath: {
          ...state.filesByPath,
          ...action.payload.filesByPath
        },
        openedDirectories: {
          ...state.openedDirectories,
          [action.payload.filePath]: action.payload.items
        }
      };
    case types.FETCH_FILE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        openedFiles: {
          [action.payload.filePath]: action.payload
        },
        activeFile: action.payload.filePath
      };
    default:
      return state;
  }
}
  