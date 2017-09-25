/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_CAR } from './constants';
import { loadSelectedCarSuccess, loadSelectedCarFailure } from './actions';

import API from '../../Api'
const realApi = API.create()

import request from 'utils/request';

function* loadCarRoutes(id) {
  const resp = yield call(realApi.loadRoutesById, id);
  console.log(resp, 'inload routes')
  return resp;
}

export function* loadSelectedCar(action) {
  const { id } = action
  try {
    // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
    const response = yield call(realApi.loadSelectedCar, id);
    console.log('first response: ',response)
    if (response.ok) {
      const data = response.data;
      const routes = data.routes_id || [];
      let allRoutes = [];
      for ( let i = 0 ; i < routes.length ; i++) {
        let routeResponse = yield call(realApi.loadRoutesById, routes[i]);
        allRoutes.push(routeResponse.data)
      }
      yield put(loadSelectedCarSuccess(response.data, allRoutes));
    } else {
      throw response.problem
    }
  } catch (err) {
    yield put(loadSelectedCarFailure(err));
  }
}

export function* selectedCar() {
  yield takeLatest(LOAD_CAR, loadSelectedCar);
}

export default [
  selectedCar,
];
