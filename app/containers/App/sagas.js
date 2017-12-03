/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_USER_DATAS } from './constants';
import { getUserDataSuccess, getUserDataError } from './actions';

import API from '../../Api'
const realApi = API.create()

import request from 'utils/request';

export function* getUserDatas(action) {
  const { uid } = action
  try {
    const response = yield call(realApi.getUserData, uid)
    console.log('RESP', response)
    if (response.ok) {
        yield put(getUserDataSuccess(response));
    } else {
        throw response;
    }
  } catch (err) {
    yield put(getUserDataError(err));
  }
}

export function* connectSagas() {
  yield takeLatest(GET_USER_DATAS, getUserDatas);
}

export default [
 connectSagas,
];
