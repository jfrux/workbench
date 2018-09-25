/* reducer for managing list of eons and scanning for eons */
import * as types from '../constants/task_action_types'
import settings from 'electron-settings';

const initialState = {
  currentTask: null,
  progress: 0,
  status: "idle",
  taskLog: []
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    /* SSH Connections might should be moved to EON reducer */
    case types.TASK_START:
      return {
        ...state,
        status: "running",
        currentTask: action.payload.task
      };
    case types.TASK_MESSAGE:
      return {
        ...state,
        taskLog: action.payload.message
      }
    case types.TASK_COMPLETE:
      return {
        ...state,
        status: "complete"
      }
    case types.TASK_STOP:
      return {
        ...state,
        status: "stopped"
      }
    default:
      return state;
  }
}
