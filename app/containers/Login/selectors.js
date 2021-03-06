import { createSelector } from 'reselect';

const selectedCar = (state) => state.get('selectedCar');

const selectLoading = () => createSelector(
  selectedCar,
  (homeState) => homeState.get('loading')
);

const selectError = () => createSelector(
    selectedCar,
    (homeState) => homeState.get('error')
  );

const selectCarDetails = () => createSelector(
    selectedCar,
    (homeState) => homeState.getIn('carDetails')
);

const selectAllRoutes = () => createSelector(
  selectedCar,
  (homeState) => homeState.getIn('allRoutes')
);

export {
  selectedCar,
  selectLoading,
  selectError,
  selectCarDetails,
  selectAllRoutes,
};
