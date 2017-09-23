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
  GET_ALL_WORKERS_DATA,
  GET_ALL_WORKERS_DATA_SUCCESS,
  GET_ALL_WORKERS_DATA_FAILURE,
  GET_ALL_CARS,
  GET_ALL_CARS_SUCCESS,
  GET_ALL_CARS_FAILURE,
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
    case GET_ALL_WORKERS_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('workers', null);
    case GET_ALL_WORKERS_DATA_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn('workers', action.workers);
    case GET_ALL_WORKERS_DATA_FAILURE:
      return state
        .setIn('error', action.error)
        .set('loading', false);
    case GET_ALL_CARS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('cars', null);
    case GET_ALL_CARS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn('cars', action.cars);
    case GET_ALL_CARS_FAILURE:
      return state
        .setIn('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
