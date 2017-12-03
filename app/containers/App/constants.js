/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */


export const DEFAULT_LOCALE = 'hu';
export const GET_ALL_WORKERS_DATA = 'GET_ALL_WORKERS_DATA';
export const GET_ALL_WORKERS_DATA_SUCCESS = 'GET_ALL_WORKERS_DATA_SUCCESS';
export const GET_ALL_WORKERS_DATA_FAILURE = 'GET_ALL_WORKERS_DATA_FAILURE';
export const GET_ALL_CARS = 'GET_ALL_CARS';
export const GET_ALL_CARS_SUCCESS = 'GET_ALL_CARS_SUCCESS';
export const GET_ALL_CARS_FAILURE = 'GET_ALL_CARS_FAILURE';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const REGISTER_USER = 'REGISTER_USER';
export const GET_USER_DATAS = 'GET_USER_DATAS';
export const GET_USER_DATAS_SUCCESS = 'GET_USER_DATAS_SUCCESS';
export const GET_USER_DATAS_FAILURE = 'GET_USER_DATAS_FAILURE';
