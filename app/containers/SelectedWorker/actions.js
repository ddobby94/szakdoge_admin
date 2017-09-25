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