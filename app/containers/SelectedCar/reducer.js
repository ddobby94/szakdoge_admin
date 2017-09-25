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
  LOAD_CAR,
  LOAD_CAR_SUCCESS,
  LOAD_CAR_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  carDetails: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CAR:
      return state
        .set('loading', true)
        .set('id', action.id)
        .set('error', false)
        .set('carDetails', null);
    case LOAD_CAR_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .setIn('carDetails', action.carDetails)
        .setIn('allRoutes', action.allRoutes)
    case LOAD_CAR_FAILURE:
      return state
        .setIn('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
