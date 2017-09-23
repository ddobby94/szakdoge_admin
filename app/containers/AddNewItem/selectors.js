import { createSelector } from 'reselect';

const selectNew = (state) => state.get('new');

const selectLoading = () => createSelector(
  selectNew,
  (homeState) => homeState.get('loading')
);

const selectError = () => createSelector(
    selectNew,
    (homeState) => homeState.get('error')
  );

const selectResponse = () => createSelector(
    selectNew,
    (homeState) => homeState.get('response')
);

const selectSentData = () => createSelector(
    selectNew,
    (homeState) => homeState.get('data')
);

export {
  selectNew,
  selectLoading,
  selectError,
  selectResponse,
  selectSentData,
};
