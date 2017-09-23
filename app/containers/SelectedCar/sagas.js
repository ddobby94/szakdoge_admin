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

export function* loadSelectedCar(action) {
  const { id } = action
  try {
    // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
    const response = yield call(realApi.loadSelectedCar, id);
    console.log(response)
    if (response.ok) {
      yield put(loadSelectedCarSuccess(response.data));
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
