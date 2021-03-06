
import {
    POST_NEW_CAR,
    POST_NEW_CAR_SUCCESS,
    POST_NEW_CAR_FAILURE,
    POST_NEW_WORKER_SUCCESS,
    POST_NEW_WORKER_FAILURE,
    POST_NEW_WORKER,
  } from './constants';
  
  export function postNewCar(company, id, data) {
    return {
      type: POST_NEW_CAR,
      company,
      id,
      data,
    };
  }

  export function postNewCarSuccess(response) {
    return {
      type: POST_NEW_CAR_SUCCESS,
      response,
    };
  }

  export function postNewCarFailure(error) {
    return {
      type: POST_NEW_CAR_FAILURE,
      error,
    };
  }
  
  export function postNewWorker(data) {
    return {
      type: POST_NEW_WORKER,
      data,
    };
  }

  export function postNewWorkerSuccess(response) {
    return {
      type: POST_NEW_WORKER_SUCCESS,
      response,
    };
  }
  export function postNewWorkerFailure(error) {
    return {
      type: POST_NEW_WORKER_FAILURE,
      error,
    };
  }