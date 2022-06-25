/* --------- IMPORTS ---------- */

import { USER_ACTION_TYPES } from './user.types';
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { AdditionalInformation, UserData } from '../../utils/firebase/firebase.utils';

/* --------- ACTION TYPES ---------- */

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData >;
export type SignInFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAIL, Error >;
export type EmailSignUpStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {email: string, password: string, displayName: string} >;
export type EmailSignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, { user: UserData, additionalDetails: AdditionalInformation }>;
export type EmailSignUpFail  = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_FAIL, Error>;
export type UserSignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type UserSignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type UserSignOutFail  = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAIL, Error>;

/* ----------- ACTION GENERATING FUNCTIONS ------------ */

export const checkUserSession =  withMatcher((): CheckUserSession =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher((): GoogleSignInStart =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}));

export const signInSuccess = withMatcher((user: UserData): SignInSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFail = withMatcher((error: Error): SignInFail =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error));

export const emailSignUpStart = withMatcher((email: string, password: string, displayName: string): EmailSignUpStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {email, password, displayName}));

export const emailSignUpSuccess = withMatcher((user: UserData, additionalDetails: AdditionalInformation): EmailSignUpSuccess =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, { user, additionalDetails }));

export const emailSignUpFail = withMatcher((error: Error): EmailSignUpFail =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_FAIL, error));

export const userSignOutStart = withMatcher((): UserSignOutStart =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const userSignOutSuccess = withMatcher((): UserSignOutSuccess =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const userSignOutFail = withMatcher((error: Error): UserSignOutFail =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error));
