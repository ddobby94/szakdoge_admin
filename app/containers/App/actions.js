/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

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
} from './constants';

export function loadWorkersData() {
  return {
    type: GET_ALL_WORKERS_DATA,
  };
}

export function loadWorkersDataSuccess(workers) {
  return {
    type: GET_ALL_WORKERS_DATA_SUCCESS,
    workers,
  };
}

export function loadWorkersDataFailure(error) {
  return {
    type: GET_ALL_WORKERS_DATA_FAILURE,
    error,
  };
}

export function loadCars() {
  return {
    type: GET_ALL_CARS,
  };
}

export function loadCarsSuccess(cars) {
  return {
    type: GET_ALL_CARS_SUCCESS,
    cars,
  };
}

export function loadCarsFailure(error) {
  return {
    type: GET_ALL_CARS_FAILURE,
    error,
  };
}

export const setUserToken = (token) => ({
  type: SET_USER_TOKEN,
  token,
})

export const registerUser = (uid) => ({
  type: REGISTER_USER,
  uid,
})

export const getUserData = (uid) => ({
  type: GET_USER_DATAS,
  uid,
})

export const getUserDataSuccess = (user) => ({
  type: GET_USER_DATAS_SUCCESS,
  user,
})

export const getUserDataError = (error) => ({
  type: GET_USER_DATAS_FAILURE,
  error,
})

export const getCompanyData = (uid) => ({
  type: GET_COMPANY_DATA,
  uid
})

export const getCompanyDataSuccess = (companyData) => ({
  type: GET_COMPANY_DATA_SUCCESS,
  companyData,
})

export const getCompanyDataError = (error) => ({
  type: GET_COMPANY_DATA_ERROR,
  error,
})

export const newCarAdded = (newCar) => ({
  type: NEW_CAR_ADDED,
  newCar,
})

export const newWorkerAdded = (newWorker) => ({
  type: NEW_WORKER_ADDED,
  newWorker,
})

export const carsLoaded = (cars) => ({
  type: CARS_LOADED,
  cars,
})

export const workersLoaded = (workers) => ({
  type: WORKERS_LOADED,
  workers,
})

export const setLocationHelper = (location) => ({
  type: SET_LOCATION_HELPER,
  location,
})

