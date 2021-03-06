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
import { createSelector } from 'reselect';

import { 
  allCars,
  allWorkers,
  getOwnCompanyData,
  makeSelectLoading,
  getUser,
  selectResponse,
  getError,
} from './selectors';

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
  NEW_CAR_ADDED,
  NEW_WORKER_ADDED,
  CARS_LOADED,
  WORKERS_LOADED,
  SET_LOCATION_HELPER,
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
      .set('error', false)
      .set('companyData', null)
      .setIn('loading', true);
    case GET_COMPANY_DATA_SUCCESS:
      return state
        .setIn('loading', false)
        .set('error', false)
        .set('workers', action.workers)
        .setIn('companyData', action.companyData);
    case GET_COMPANY_DATA_ERROR:
      return state
        .setIn('loading', false)
        .set('error', false)
        .setIn('companyData', null);
    case CARS_LOADED:
      return state
        .setIn('loading', false)
        .setIn('cars', action.cars)
    case WORKERS_LOADED:
      return state
        .setIn('loading', false)
        .setIn('workers', action.workers)
    case SET_LOCATION_HELPER: 
      return state
        .setIn('location', action.location)
    case NEW_CAR_ADDED:
      return Object.assign({}, state, {
        cars: [
          ...state.cars,
          action.newCar,
        ]
      });
    case NEW_WORKER_ADDED: {
      console.log('actions_ ', action)
      // const newCompanyData = {
      //   ...action.compData,
      //   workers: [
      //     ...action.compData.workers,
      //     [action.compData.workers.length]: action.newWorker,
      //   ]
      // }
      return state
      .set('loading', false)
      // .setIn('companyData', newCompanyData);
    }
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
    case POST_NEW_WORKER:
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
