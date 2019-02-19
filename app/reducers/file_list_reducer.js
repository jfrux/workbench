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
      return {
        ...state,
        openedFiles: {
          [action.payload.filePath]: action.payload
        },
        activeFile: action.payload.filePath
      };
    case types.UPDATE_CONTENT:
      return {
        ...state,
        openedFiles: {
          [action.payload.filePath]: {
            ...state.openedFiles[action.payload.filePath],
            content: action.payload.content,
            isDirty: action.payload.content !== state.openedFiles[action.payload.filePath]._original
          }
        }
      };
    case types.SAVE_ACTIVE_FILE:
      return {
        ...state,
        openedFiles: {
          [state.activeFile]: {
            ...state.openedFiles[state.activeFile],
            isSaving: true
          }
        }
      };
    case types.SAVE_ACTIVE_FILE_SUCCESS:
      return {
        ...state,
        openedFiles: {
          [state.activeFile]: {
            ...state.openedFiles[state.activeFile],
            isSaving: false,
            _original: state.openedFiles[state.activeFile].content,
            isDirty: false
          }
        }
      };
    case types.CLOSE_FILE:
      delete state.openedFiles[action.payload.filePath];
      
      return {
        ...state,
        activeFile: null,
        openedFiles: {
          ...state.openedFiles
        }
      };
    default:
      return state;
  }
}
  