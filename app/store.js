/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
// import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import storage from 'redux-persist/es/storage';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { createLogger } from 'redux-logger'

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const reducer = createReducer();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    logger,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */
  // return new Promise((resolve, reject) => {
  //   try {
  //     const store = createStore(
  //       reducer,
  //       initialState,
  //       composeEnhancers(...enhancers)
  //     );

  //     persistStore(
  //       store,
  //       { storage: localStorage },
  //       () => resolve(store)
  //     );
  //   } catch (e) {
  //     reject(e);
  //   }
  // });

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store, storage, () => { store.getState() })

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return { store, persistor };
}
