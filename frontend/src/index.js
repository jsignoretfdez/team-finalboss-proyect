import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import App from "./components/App/index";
import "semantic-ui-css/semantic.min.css";
import storage from './utils/storage';

import { configureClient } from './api/client';
import { configureStore } from './store';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

// Create and configure a redux store
const history = createBrowserHistory();
const store = configureStore({ auth: token }, { history });

ReactDOM.render(
  <Provider store={store} history={history}>
    <App />
  </Provider>,
  document.getElementById('root'),
);