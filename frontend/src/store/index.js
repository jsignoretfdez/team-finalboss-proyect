import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from './reducers';
import * as api from '../api';

export const history = createBrowserHistory();

export function configureStore(preloadedState) {
  const reducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument({ history, api }),
    logger,
  ];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
}
