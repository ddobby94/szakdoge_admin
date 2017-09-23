/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { POST_NEW_CAR, POST_NEW_WORKER } from './constants';
import { postNewWorkerSuccess, postNewWorkerFailure, postNewCarSuccess, postNewCarFailure } from 'containers/App/actions';

import API from '../../Api'
const realApi = API.create()

import request from 'utils/request';

export function* addNewCar(api, action) {
  const { id, data } = action
  console.log('-----------------------------------------------------------------')
  console.log(data)
  console.log(id)
  console.log(api.addNewCar)
  try {
    // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
    const response = yield call(api.addNewCar, id, data);
    console.log('cars', cars)
    yield put(postNewCarSuccess(cars));
  } catch (err) {
    yield put(postNewCarFailure(err));
  }
}


export function* addNewWorker(api, action) {
    const { data } = action
    try {
      // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
      const response = yield call(api.addNewWorker, data);
      console.log('cars', cars)
      yield put(postNewWorkerSuccess(cars));
    } catch (err) {
      yield put(postNewWorkerFailure(err));
    }
  }


export function* addNewItem() {
  yield takeLatest(POST_NEW_CAR, addNewCar, realApi);
  yield takeLatest(POST_NEW_WORKER, addNewWorker, realApi);
}

export default [
  addNewItem,
];
