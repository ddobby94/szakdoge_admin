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
  (globalState) => globalState.get('loading')
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
};
