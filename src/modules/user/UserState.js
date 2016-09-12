import {Map, fromJS} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {createUser} from '../../services/backScratchService';

// Initial state
const initialState = Map({
  loading: false,
  value: {}
});

// Actions
const USER_FOUND = 'UserState/USER_FOUND';
const POST_RESPONSE = 'UserState/POST_RESPONSE';
const POST_REQUEST = 'UserState/POST_REQUEST';

// Action creators
export function onExistingUser(user) {
  return {
    type: USER_FOUND,
    payload: fromJS(user)
  };
}

export function post(user) {
  return {
    type: POST_REQUEST,
    payload: user
  };
}

export async function submitNewUser(user) {
  return {
    type: POST_RESPONSE,
    payload: await createUser(user)
  };
}

// Reducer
export default function UserStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case USER_FOUND:
      return state
        .set('value', action.payload);

    case POST_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(submitNewUser, action.payload)
      );
    case POST_RESPONSE:
      return state
        .set('loading', false)
        .set('value', action.payload);
    default:
      return state;
  }
}
