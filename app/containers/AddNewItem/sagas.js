/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { POST_NEW_CAR, POST_NEW_WORKER } from './constants';
import { postNewWorkerSuccess, postNewWorkerFailure, postNewCarSuccess, postNewCarFailure } from './actions';

import API from '../../Api'
const realApi = API.create()

import request from 'utils/request';

export function* addNewCar(action) {
  const { id, data } = action
  
  try {
    // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
    const response = yield call(realApi.addNewCar, id, data);
    yield put(postNewCarSuccess(response));
  } catch (err) {
    yield put(postNewCarFailure(err));
  }
}


export function* addNewWorker(action) {
    const { data } = action
    try {
        const response = yield call(realApi.setUserData, data);
        if (response.ok) {
          yield put(postNewWorkerSuccess(response));
        } else {
          throw response;
        }
    } catch (err) {
      yield put(postNewWorkerFailure(err));
    }
  }


export function* addNewItem() {
  yield takeLatest(POST_NEW_CAR, addNewCar);
  yield takeLatest(POST_NEW_WORKER, addNewWorker);
}

export default [
  addNewItem,
];
