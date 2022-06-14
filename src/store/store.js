import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// alternative custom logger
import { loggerMiddleware } from './middleware/logger';

//Persist is for storing local state between sessions (an allowing to refresh)
const persistConfig = {
  key: 'root',
  storage,
  // a list of reducers we don't want to persist:
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

// Setup to use the Redux Devtools in Chrome:
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// this needs to be done in order to use Middleware:
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//second argument is optional:
export const store = createStore( persistedReducer, undefined, composedEnhancers );

export const persistor = persistStore(store);