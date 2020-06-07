import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';

// REDUX
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import Reducers from './app/store/reducers';

// "MIDDLE" VARIABLES
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const createStoreWithMiddleware = createStore(Reducers, composeEnhancers(
//   applyMiddleware(ReduxPromise)
// ))
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const AppRedux = () => (
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
