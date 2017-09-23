/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_WORKER,
  LOAD_WORKER_SUCCESS,
  LOAD_WORKER_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  workers: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WORKER:
      return state
        .set('loading', true)
        .set('id', action.id)
        .set('error', false)
        .setIn('workerDetails', null);
    case LOAD_WORKER_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn('workerDetails', action.workerDetails);
    case LOAD_WORKER_FAILURE:
      return state
        .setIn('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
