/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_WORKER } from './constants';
import { loadSelectedWorkerSuccess, loadSelectedWorkerFailure } from './actions';

import API from '../../Api'
const realApi = API.create()

import request from 'utils/request';

export function* loadSelectedWorker(action) {
  const { id } = action
  try {
    // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
    const response = yield call(realApi.loadSelectedWorker, id);
    console.log(response)
    if (response.ok) {
      yield put(loadSelectedWorkerSuccess(response.data));
    } else {
      throw response.problem
    }
  } catch (err) {
    yield put(loadSelectedWorkerFailure(err));
  }
}

export function* selectedWorker() {
  yield takeLatest(LOAD_WORKER, loadSelectedWorker);
}

export default [
  selectedWorker,
];
