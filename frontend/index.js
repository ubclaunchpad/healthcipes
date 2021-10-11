/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
// import {Provider} from 'react-redux';
import {name as appName} from './app.json';
// import store from './src/redux/store';

const AppWrapper = () => (
  // <Provider store={store}>
  <App />
  // </Provider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
