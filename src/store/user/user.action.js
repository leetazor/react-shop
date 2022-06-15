import { USER_ACTION_TYPES } from './user.types';
import { createAction } from "../../utils/reducer/reducer.utils";


export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
       createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFail = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error);

export const emailSignUpStart = (email, password, displayName) =>
       createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {email, password, displayName});

export const emailSignUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, { user, additionalDetails } );

export const emailSignUpFail = (error) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_FAIL, error);

export const userSignOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const userSignOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const userSignOutFail = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error);
