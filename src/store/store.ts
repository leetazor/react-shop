/* ------------ IMPORTS ------------- */

import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// if this throws a type error, need to install a type library for 'redux-logger'
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

// alternative custom logger
//import { loggerMiddleware } from './middleware/logger';

/* ------------ TYPES ------------- */

// evaluating the type of whatever is returned from the rootReducer function, and then applying this type to the 'store'
export type RootState = ReturnType<typeof rootReducer>

// here we are extending on Window type (that already exists) and providing in with an optional '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' value
declare global {
  interface Window {
    // this DevTool extension is giving us a type of special 'compose' function (which we get from redux)
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// function intersection - we're combining PersistConfig (from redux-persist) and a new object,
// overriding the default PersistConfig's whitelist: string[]
type ExtendedPersistConfig = PersistConfig<RootState> & {
  // we want whitelist to only contain an array of keys out of the RootState type
  whitelist: (keyof RootState)[];
}

/* ------------ CONFIG & MIDDLEWARE ------------- */

// PERSISTOR (allows to store data in sessions to allow for refresh)

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  // a list of reducers we don't want to persist:
  //blacklist: ['user']
  // a list of reducers we do want to persist:
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// SAGA

const sagaMiddleware = createSagaMiddleware();

// ALL MIDDLEWARES

// Middleware doesn't know that if we filter the below array of Middlewares by 'Boolean', the 'falsy' results will be removed and we will stay with only Middlewares
// we need to let Middleware know, that if we pass the truthiness of the filer, we will be, for sure, left with only Middlewares
// we are using Type Predicate Function here to achieve that (we are importing Middleware type from 'redux' for that)
// inside of 'filter' we are using a callback, that checks the type of what's being filtered. If the filter is passed, then we know that it's 100% middleware
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

// Setup to use the Redux Devtools in Chrome
// If we are not in 'production' - Redux Devtools can be used 
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// this needs to be done in order to use Middleware (we're applying either 'compose' or 'composedEnhancer')
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

/* ------------ STORE ------------- */

// THE STORE
//second argument is optional:
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// RUN SAGAS
sagaMiddleware.run(rootSaga);

// EXPORT PERSISTOR
export const persistor = persistStore(store);
