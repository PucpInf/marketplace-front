/**
 * store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import responseMiddleware from 'redux-response-middleware';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
   const store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(responseMiddleware())),
   )
   return store;
}