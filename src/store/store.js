import { compose, createStore, applyMiddleware } from 'redux';
//import { createStore } from 'react-redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';


const middleWares = [logger];

// this needs to be done in order to use Middleware:
const composedEnhancers = compose(applyMiddleware(...middleWares));

//second argument is optional:
export const store = createStore(rootReducer, undefined, composedEnhancers);