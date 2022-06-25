/* ------------ IMPORTS ------------- */

import { UserState } from './user.reducer';
import { createSelector } from 'reselect';
import { RootState } from '../store';

/* ------------ PART OF THE STATE SELECTORS ------------- */

export const selectUserReducer = (state: RootState): UserState => state.user;

/* ------------ MEMOIZED SELECTORS ------------- */

export const selectCurrentUser = createSelector(
  selectUserReducer,  
  (user)=> user.currentUser
  );