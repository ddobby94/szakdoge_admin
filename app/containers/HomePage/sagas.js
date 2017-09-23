/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_ALL_WORKERS_DATA } from 'containers/App/constants';
import { loadWorkersDataSuccess, loadWorkersDataFailure } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';


export function* getWorkers() {
  const requestURL = `https://my-trips-1f14a.firebaseio.com/workers.json`;
  try {
    // Call our request helper (see 'utils/request')
    const workers = yield call(request, requestURL);
    console.log('workers', workers)
    yield put(loadWorkersDataSuccess(workers));
  } catch (err) {
    yield put(loadWorkersDataFailure(err));
  }
}

export function* githubData() {
  const workerWatcher = yield takeLatest(GET_ALL_WORKERS_DATA, getWorkers);
  yield take(LOCATION_CHANGE);
  yield cancel(workerWatcher);
}

export default [
  githubData,
];
