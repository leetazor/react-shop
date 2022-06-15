import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFail } from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
      const userSnapshot = yield call(
       createUserDocumentFromAuth,
       userAuth,
       additionalDetails
      );
      yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }));
  } catch(error) {
    yield put(signInFail(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if(!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
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

export function* signInWithEmail( { payload: {email, password} }) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch(error) {
    yield put(signInFail(error));
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


export function* userSagas() {
  yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)]);
}