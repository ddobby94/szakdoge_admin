/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_USER_DATAS, GET_COMPANY_DATA } from './constants';
import {
  getUserDataSuccess,
  getUserDataError,
  getCompanyDataSuccess,
  getCompanyDataError,
  carsLoaded,
  workersLoaded,
  newWorkerAdded,
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

export function* connectSagas() {
  yield takeLatest(GET_USER_DATAS, getUserDatas);
  yield takeLatest(GET_COMPANY_DATA, getCompanyDatas);
}

export default [
 connectSagas,
];
