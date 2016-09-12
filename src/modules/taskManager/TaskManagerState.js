import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {getUserAssignedTasks} from '../../services/backScratchService';

// Initial state
const initialState = Map({
  assignedTasks: [],
  loading: false
});

// Actions
const ASSIGNED_TASKS_REQUEST = 'TaskManagerState/ASSIGNED_TASKS_REQUEST';
const ASSIGNED_TASKS_RESPONSE = 'TaskManagerState/ASSIGNED_TASKS_RESPONSE';

// Action creators
export function assignedTasks() {
  return {
    type: ASSIGNED_TASKS_REQUEST
  };
}

export async function assignedTasksResponse() {
  return {
    type: ASSIGNED_TASKS_RESPONSE,
    payload: await getUserAssignedTasks()
  };
}

// Reducer
export default function TaskManagerStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ASSIGNED_TASKS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(assignedTasksResponse)
      );

    case ASSIGNED_TASKS_RESPONSE:
      return state
        .set('loading', false)
        .set('assignedTasks', action.payload);

    default:
      return state;
  }
}
