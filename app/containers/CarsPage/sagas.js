/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, GET_ALL_WORKERS_DATA } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, loadWorkersDataSuccess, loadWorkersDataFailure } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getWorkers() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
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

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, getRepos);
  const workerWatcher = yield takeLatest(GET_ALL_WORKERS_DATA, getWorkers);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];
