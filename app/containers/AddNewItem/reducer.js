import { fromJS } from 'immutable';

import {
    POST_NEW_CAR,
    POST_NEW_CAR_SUCCESS,
    POST_NEW_CAR_FAILURE,
    POST_NEW_WORKER,
    POST_NEW_WORKER_SUCCESS,
    POST_NEW_WORKER_FAILURE,
  } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  response: null,
  data: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case POST_NEW_CAR:
      return state
        .set('loading', true)
        .setIn('data', action.data);
    case POST_NEW_CAR_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn('response', action.response);
    case POST_NEW_CAR_FAILURE:
      return state
        .setIn('error', action.error)
        .set('loading', false);
    case POST_NEW_CAR:
      return state
        .set('loading', true)
        .setIn('data', action.data);
    case POST_NEW_WORKER_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn('response', action.response);
    case POST_NEW_WORKER_FAILURE:
      return state
        .setIn('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
