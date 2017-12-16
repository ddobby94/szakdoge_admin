
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';

import App from 'containers/App';
import { makeSelectLocationState } from 'containers/App/selectors';
import LanguageProvider from 'containers/LanguageProvider';

/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import * as firebase from "firebase";
import configureStore from './store';
import { translationMessages } from './i18n';
import './global-styles';
import createRoutes from './routes';
const initialState = {};
const { store, persistor } = configureStore(initialState, browserHistory);
const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});


// Set up the router, wrapping all Routes in the App component


const onBeforeLift = () => {
  // take some action before the gate lifts
}

class Bootloader extends Component {
  state = {
    store: null,
    persistor: null,
  }

  async componentWillMount () {
    const { store, persistor } = await configureStore(initialState, browserHistory);
    this.setState({ store, persistor });
  }

  render () {
    console.log('STORE: ', this.state.store)
    console.log('****************************')
    console.log('persistor',this.state.persistor)
    if (this.state.store === null || this.state.persistor === null) {
      return (
        <h1>
          Booting...
        </h1>
      )
    }
    console.log('STORE: ', this.state.store)
    console.log('****************************')
    console.log('persistor',this.state.persistor)
    const rootRoute = {
      component: App,
      childRoutes: createRoutes(this.state.store),
    };
    const history = syncHistoryWithStore(browserHistory, this.state.store, {
      selectLocationState: makeSelectLocationState(),
    });
    console.log('rootRoute: ', rootRoute)
    return (
      <Provider store={this.state.store}>
        <PersistGate 
          loading={<div> Loading....</div>}
          // onBeforeLift={onBeforeLift}
          persistor={this.state.persistor}
        >
          <LanguageProvider messages={this.props.messages}>
            <Router
              history={history}
              routes={rootRoute}
              render={
                applyRouterMiddleware(useScroll())
              }
            />
        </LanguageProvider>
      </PersistGate>
    </Provider>
    )
  }
}



const render = (messages) => {

  var config = {
    apiKey: "AIzaSyDMgFJsq1kQD1DjvJhywDyk-K1clTecBu4",
    authDomain: "my-trips-1f14a.firebaseapp.com",
    databaseURL: "https://my-trips-1f14a.firebaseio.com",
    projectId: "my-trips-1f14a",
    storageBucket: "my-trips-1f14a.appspot.com",
    messagingSenderId: "478356909002"
  };
  firebase.initializeApp(config);
  ReactDOM.render(<Bootloader messages={messages}/>, document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
