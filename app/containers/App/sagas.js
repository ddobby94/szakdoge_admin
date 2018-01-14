/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { 
  GET_USER_DATAS,
  GET_COMPANY_DATA,
  POST_NEW_CAR,
  POST_NEW_WORKER,
} from './constants';
import {
  getUserDataSuccess,
  getUserDataError,
  getCompanyDataSuccess,
  getCompanyDataError,
  carsLoaded,
  workersLoaded,
  newWorkerAdded,
  postNewWorkerSuccess,
  postNewWorkerFailure,
  postNewCarSuccess,
  postNewCarFailure,
  newCarAdded,
} from './actions';

import API from '../../Api'
const realApi = API.create()

import request from 'utils/request';

export function* getUserDatas(action) {
  const { uid } = action
  try {
    const response = yield call(realApi.getUserData, uid)
    console.log('getUserDatas resp', response)
    if (response.ok) {
        yield put(getUserDataSuccess({ ...response.data, uid }));
    } else {
        throw response;
    }
  } catch (err) {
    yield put(getUserDataError(err));
  }
}

export function* getCompanyDatas(action) {
  const { uid } = action
  try {
    const response = yield call(realApi.getCompanyData, uid)
    console.log('getCompanyData resp', response)
    if (response.ok) {
      const data = response.data;
      yield put(carsLoaded(data.cars));
      yield put(workersLoaded(data.workers));
      yield put(getCompanyDataSuccess(data));
    } else {
        throw response;
    }
  } catch (err) {
    yield put(getCompanyDataError(err));
  }
}

export function* addNewCar(action) {
  const { id, data, company } = action
  
  try {
    const response = yield call(realApi.addNewCar, company, id, data);
    yield put(newCarAdded(data));
    yield put(postNewCarSuccess(response));
  } catch (err) {
    yield put(postNewCarFailure(err));
  }
}

export function* addNewWorker(action) {
    const { data, compData } = action
    try {
        const response = yield call(realApi.setUserData, data);
        if (response.ok) {
          yield put (newWorkerAdded(data, compData));
          // yield put(postNewWorkerSuccess(response));
        } else {
          throw response;
        }
    } catch (err) {
      yield put(postNewWorkerFailure(err));
    }
  }

export function* connectSagas() {
  yield takeLatest(GET_USER_DATAS, getUserDatas);
  yield takeLatest(GET_COMPANY_DATA, getCompanyDatas);
  yield takeLatest(POST_NEW_CAR, addNewCar);
  yield takeLatest(POST_NEW_WORKER, addNewWorker);
}

export default [
 connectSagas,
];
