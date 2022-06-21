
/*  Sagas are fired by actions, in this particular case "start" type actions EMAIL_SIGN_IN_START
    If the Async call in the saga succeeds, sagas trigger another actions - e.g. EMAIL_SIGN_IN_SUCCESS,
    which are, in turn, modify the Reducer Object (and Global Store).
    So the flow is - from our components we dispatch 'Starting' actions that trigger Sagas, 
    Sagas (which are also Generator Functions) perform Async actions and then
    trigger further actions, which update the Reducers.  */

import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFail, emailSignUpSuccess, userSignOutSuccess, emailSignUpFail, userSignOutFail  } from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from '../../utils/firebase/firebase.utils';


export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if(!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch(error) {
    yield put(signInFail(error));
  }
}

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
      //here we are trying to create a record in the database about this user, in case there is no such record yet
      const userSnapshot = yield call(
        createUserDocumentFromAuth,
        userAuth,
        additionalDetails
      );
      // after the above, we continue on to storing the Authorised user in the Global State (User Reducer)
      // we are passing the id separately, because of the firebase structure
      // id is on the Snapshot, but on on the Snapshot.data()
      yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }));
  } catch(error) {
    yield put(signInFail(error));
  }
}

export function* signInWithGoogle() {
   try {
    const {user} = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
   } catch(error) {
    yield put(signInFail(error));
   }
}

export function* signInWithEmail({ payload: {email, password} }) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch(error) {
    yield put(signInFail(error));
  }
}

export function* signUpWithEmail({ payload: {email, password, displayName} }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(emailSignUpSuccess(user, { displayName}));
  } catch(error) {
    yield put(emailSignUpFail(error));
  }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* userSignOut() {
  try {
    yield call(signOutUser);
    yield put(userSignOutSuccess());
  } catch(error) {
    yield put(userSignOutFail(error));
  }
}

// this user saga is listening to CHECK_USER_SESSION action type
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//this saga is triggered on GOOGLE_SIGN_IN_START action type
//takes in the action type and a callback function
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

//this saga is triggered on EMAIL_SIGN_IN_START action type
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

//this saga is triggered on EMAIL_SIGN_UP_START action type
export function* onEmailSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpWithEmail);
}

export function* onEmailSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, userSignOut);
}



export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onEmailSignUpSuccess),
    call(onSignOutStart)
  ]);
}