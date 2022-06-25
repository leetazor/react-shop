/* ------------ IMPORTS ------------- */
import { AnyAction } from 'redux';

import { UserData } from '../../utils/firebase/firebase.utils';

import {
  signInSuccess,
  userSignOutSuccess,
  userSignOutFail,
  signInFail,
  emailSignUpFail
} from './user.action';

/* ------------ TYPES ------------- */

export type UserState = {
  readonly currentUser: UserData | null,
  readonly isLoading: boolean,
  readonly error: Error | null;
}

/* ------------ REDUCER ------------- */

// Initial State
const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

 export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => { 
  
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload }; 
   }
   if (userSignOutSuccess.match(action)) {
    return { ...state, currentUser: null }; 
   }
   if (userSignOutFail.match(action) || signInFail.match(action) || emailSignUpFail.match(action)) {
    return { ...state, error: action.payload }; 
   }
   return state;

  // switch(action.type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return { ...state, currentUser: action.payload };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:  
  //     return { ...state, currentUser: null }; 
  //   case USER_ACTION_TYPES.SIGN_IN_FAIL: 
  //   case USER_ACTION_TYPES.SIGN_OUT_FAIL:
  //   case USER_ACTION_TYPES.EMAIL_SIGN_UP_FAIL:        
  //     return { ...state, error: action.payload };
  //   default:
  //     return state;
  // } 
}
