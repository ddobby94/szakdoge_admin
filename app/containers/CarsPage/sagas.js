/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_ALL_WORKERS_DATA } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, loadWorkersDataSuccess, loadWorkersDataFailure } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';


export function* getWorkers() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `https://my-trips-1f14a.firebaseio.com/cars.json`;
  try {
    // Call our request helper (see 'utils/request')
    const cars = yield call(request, requestURL);
    console.log('cars', cars)
    yield put(loadWorkersDataSuccess(cars));
  } catch (err) {
    yield put(loadWorkersDataFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  yield takeLatest(GET_ALL_WORKERS_DATA, getWorkers);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];
