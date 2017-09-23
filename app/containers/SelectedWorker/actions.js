import {
    LOAD_WORKER,
    LOAD_WORKER_SUCCESS,
    LOAD_WORKER_FAILURE,
  } from './constants';
  
  export function loadSelectedWorker(id) {
    return {
      type: LOAD_WORKER,
      id,
    };
  }

  export function loadSelectedWorkerSuccess(workerDetails) {
    return {
      type: LOAD_WORKER_SUCCESS,
      workerDetails,
    };
  }

  export function loadSelectedWorkerFailure(error) {
    return {
      type: LOAD_WORKER_FAILURE,
      error,
    };
  }