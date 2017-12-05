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
  SET_USER_TOKEN,
  REGISTER_USER,
  GET_USER_DATAS,
  GET_USER_DATAS_SUCCESS,
  GET_USER_DATAS_FAILURE,
  GET_COMPANY_DATA,
  GET_COMPANY_DATA_SUCCESS,
  GET_COMPANY_DATA_ERROR,
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
    case SET_USER_TOKEN:
      return state
        .setIn('token', action.token);
    case REGISTER_USER:
      return state
        .setIn('loading', true)
    case GET_USER_DATAS: 
      return state
        .set('loading', true)
        .set('error', false)
        .setIn('user', null);
    case GET_USER_DATAS_SUCCESS: 
      return state
        .set('loading', false)
        .set('error', false)
        .setIn('user', action.user);
    case GET_USER_DATAS_FAILURE: 
      return state
        .set('loading', false)
        .set('error', true)
        .setIn('user', null);
    case GET_COMPANY_DATA:
      return state
        .set('loading', false)
        .set('error', false)
        .setIn('companyData', null);
    case GET_COMPANY_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .setIn('companyData', action.companyData);
    case GET_COMPANY_DATA_ERROR:
      return state
        .set('loading', false)
        .set('error', false)
        .setIn('companyData', null);
    default:
      return state;
  }
}

export default appReducer;
