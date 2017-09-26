import {
    LOAD_CAR,
    LOAD_CAR_SUCCESS,
    LOAD_CAR_FAILURE,
    EDIT_CAR,
    EDIT_CAR_SUCCESS,
    EDIT_CAR_FAILURE,
  } from './constants';
  
  export function loadSelectedCar(id) {
    return {
      type: LOAD_CAR,
      id,
    };
  }

  export function loadSelectedCarSuccess(carDetails, allRoutes) {
    return {
      type: LOAD_CAR_SUCCESS,
      carDetails,
      allRoutes,
    };
  }

  export function loadSelectedCarFailure(error) {
    return {
      type: LOAD_CAR_FAILURE,
      error,
    };
  }

  export function editCarDatas(id, data) {
    return {
      type: EDIT_CAR,
      id,
      data,
    };
  }

  export function editCarDatasSuccess(carDetails) {
    return {
      type: EDIT_CAR_SUCCESS,
      carDetails,
    };
  }

  export function editCarDatasFailure(error) {
    return {
      type: EDIT_CAR_FAILURE,
      error,
    };
  }