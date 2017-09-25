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
    if (response.ok) {
      const data = response.data;
      const routes = data.routes_id || [];
      let allRoutes = [];
      for ( let i = 0 ; i < routes.length ; i++) {
        let routeResponse = yield call(realApi.loadRoutesById, routes[i]);
        allRoutes.push(routeResponse.data)
      }
      yield put(loadSelectedWorkerSuccess(response.data, allRoutes));
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
