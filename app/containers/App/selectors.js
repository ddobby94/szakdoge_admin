/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const allWorkers = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('workers')
);

const allCars = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('cars')
);

const getToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('token')
);

const getUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('user')
);

const getError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('error')
);

const getOwnCompanyData = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('companyData')
);

const getWorkers = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('workers')
);

const getCars = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('cars')
);

const getSavedLocation = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('location')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocationState,
  allWorkers,
  allCars,
  getToken,
  getUser,
  getOwnCompanyData,
  getWorkers,
  getCars,
  getError,
  getSavedLocation,
};
