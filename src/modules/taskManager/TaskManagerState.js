import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {getUserAssignedTasks, getUserRequestedTasks} from '../../services/backScratchService';

// Initial state
const initialState = Map({
  assignedTasks: [],
  loading: false
});

// Actions
const ASSIGNED_TASKS_REQUEST = 'TaskManagerState/ASSIGNED_TASKS_REQUEST';
const ASSIGNED_TASKS_RESPONSE = 'TaskManagerState/ASSIGNED_TASKS_RESPONSE';
const REQUESTED_TASKS_REQUEST = 'TaskManagerState/REQUESTED_TASKS_REQUEST';
const REQUESTED_TASKS_RESPONSE = 'TaskManagerState/REQUESTED_TASKS_RESPONSE';
// Action creators
export function assignedTasks(userId) {
  return {
    type: ASSIGNED_TASKS_REQUEST,
    payload: userId
  };
}

export async function assignedTasksResponse(userId) {
  return {
    type: ASSIGNED_TASKS_RESPONSE,
    payload: await getUserAssignedTasks(userId)
  };
}

export function requestedTasks(userId) {
  return {
    type: REQUESTED_TASKS_REQUEST,
    payload: userId
  };
}

export async function requestedTasksResponse(userId) {
  return {
    type: REQUESTED_TASKS_RESPONSE,
    payload: await getUserRequestedTasks(userId)
  };
}
// Reducer
export default function TaskManagerStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ASSIGNED_TASKS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(assignedTasksResponse, action.payload)
      );

    case ASSIGNED_TASKS_RESPONSE:
      return state
        .set('loading', false)
        .set('assignedTasks', action.payload);

    case REQUESTED_TASKS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(requestedTasksResponse, action.payload)
      );

    case REQUESTED_TASKS_RESPONSE:
      return state
        .set('loading', false)
        .set('requestedTasks', action.payload);

    default:
      return state;
  }
}
