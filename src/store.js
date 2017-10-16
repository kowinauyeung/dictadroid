import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers/reducers';

const loggerMiddleware = createLogger();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  ),
);

window.store = store;

export default store;
