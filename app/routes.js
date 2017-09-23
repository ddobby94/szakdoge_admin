// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/cars',
      name: 'cars',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CarsPage/sagas'),
          import('containers/CarsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/new',
      name: 'new',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AddNewItem/reducer'),
          import('containers/AddNewItem/sagas'),
          import('containers/AddNewItem'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('new', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },  {
      path: '/selectedWorker',
      name: 'selectedWorker',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SelectedWorker/reducer'),
          import('containers/SelectedWorker/sagas'),
          import('containers/SelectedWorker'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('selectedWorker', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/selectedCar',
      name: 'selectedCar',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SelectedCar/reducer'),
          import('containers/SelectedCar/sagas'),
          import('containers/SelectedCar'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('selectedCar', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
        },
      },  {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
