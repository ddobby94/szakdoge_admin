import {
    LOAD_WORKER,
    LOAD_WORKER_SUCCESS,
    LOAD_WORKER_FAILURE,
    EDIT_WORKER,
    EDIT_WORKER_SUCCESS,
    EDIT_WORKER_FAILURE,
  } from './constants';
  
  export function loadSelectedWorker(id) {
    return {
      type: LOAD_WORKER,
      id,
    };
  }

  export function loadSelectedWorkerSuccess(workerDetails, workerAllRoutes) {
    return {
      type: LOAD_WORKER_SUCCESS,
      workerDetails,
      workerAllRoutes,
    };
  }

  export function loadSelectedWorkerFailure(error) {
    return {
      type: LOAD_WORKER_FAILURE,
      error,
    };
  }

  export function editSelectedWorker(id, data) {
    return {
      type: EDIT_WORKER,
      id,
      data,
    };
  }

  export function editSelectedWorkerSuccess(workerDetails) {
    return {
      type: EDIT_WORKER_SUCCESS,
      workerDetails,
    };
  }

  export function editSelectedWorkerFailure(error) {
    return {
      type: EDIT_WORKER_FAILURE,
      error,
    };
  }