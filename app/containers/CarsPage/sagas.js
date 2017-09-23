/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_ALL_CARS } from 'containers/App/constants';
import { loadCars, loadCarsSuccess, loadCarsFailure } from 'containers/App/actions';

import request from 'utils/request';

export function* getCars() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `https://my-trips-1f14a.firebaseio.com/cars.json`;
  try {
    // Call our request helper (see 'utils/request')
    const cars = yield call(request, requestURL);
    console.log('cars', cars)
    yield put(loadCarsSuccess(cars));
  } catch (err) {
    yield put(loadCarsFailure(err));
  }
}

export function* carPageWatcher() {
  yield takeLatest(GET_ALL_CARS, getCars);
}

// Bootstrap sagas
export default [
  carPageWatcher,
];
