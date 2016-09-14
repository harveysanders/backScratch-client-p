import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {sendRequestorTaskRating, sendAssigneeTaskRating} from '../../../services/backScratchService';

// Initial state
const initialState = Map({
  ratingModalVisible: false,
  loading: false,
  isRequestor: false
});

// Actions
const RATE_TASK = 'RatingFormState/RATE_TASK';
const RATE_TASK_RESPONSE = 'RatingFormState/RATE_TASK_RESPONSE';
const SET_MODAL_VISIBLE = 'RatingFormState/SET_MODAL_VISIBLE';
const IS_USER_REQUESTOR = 'RatingFormState/IS_USER_REQUESTOR';

// Action creators
export function isRequestor(bool) {
  return {
    type: IS_USER_REQUESTOR,
    payload: bool
  };
}
export function setModalVisible(isVisible) {
  return {
    type: SET_MODAL_VISIBLE,
    payload: isVisible
  };
}

export function rateTask(taskId, ratingInfo, isUserRequestor) {
  return {
    type: RATE_TASK,
    payload: {taskId, ratingInfo, isUserRequestor}
  };
}

export async function requestRateTask({taskId, ratingInfo, isUserRequestor}) {
  return {
    type: RATE_TASK_RESPONSE,
    payload: isUserRequestor
      ? await sendRequestorTaskRating(taskId, ratingInfo)
      : await sendAssigneeTaskRating(taskId, ratingInfo)
  };
}

// Reducer
export default function RatingFormStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_USER_REQUESTOR:
      return state
        .set('isRequestor', action.payload);

    case SET_MODAL_VISIBLE:
      return state
        .set('ratingModalVisible', action.payload);

    case RATE_TASK:
      return loop(
        state.set('loading', true),
        Effects.promise(requestRateTask, action.payload)
      );

    case RATE_TASK_RESPONSE:
      return state
        .set('loading', false);

    default:
      return state;
  }
}
