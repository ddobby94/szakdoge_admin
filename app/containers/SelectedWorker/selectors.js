import { createSelector } from 'reselect';

const selectedWorker = (state) => state.get('selectedWorker');

const selectLoading = () => createSelector(
  selectedWorker,
  (homeState) => homeState.get('loading')
);

const selectError = () => createSelector(
    selectedWorker,
    (homeState) => homeState.get('error')
  );

const selectWorkerDetails = () => createSelector(
    selectedWorker,
    (homeState) => homeState.getIn('workerDetails')
);

const selectAllRoutes = () => createSelector(
  selectedWorker,
  (homeState) => homeState.getIn('workerAllRoutes')
);

export {
  selectedWorker,
  selectLoading,
  selectError,
  selectWorkerDetails,
  selectAllRoutes,
};
