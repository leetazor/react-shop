

// importing Middleware type for typing this custom middleware
import { Middleware } from 'redux';

import { RootState } from '../store';

// we're passing an empty object to this Middleware type as the first argument, because we're not inending to modify the Dispatch through this middleware
// second argument for this middleware is the state, so we're passing 'RootState' here
export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
}

