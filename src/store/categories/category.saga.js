import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFail } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';


export function* fetchCategoriesAsync() {
  try {
    // the below is similar to 'async' - 'await until we get something from the callback function below'   
    // we are using 'call' here because we are turning it into an 'effect' for redux
    // 'categories' parameter is passed as a second argument, with a coma -
    //this is the way parameters are passed into callable functions with a 'call' method
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // 'put' is used instead of 'dispatch' in generator Sagas functions:
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFail(error));
  }  
}

// the below function is listening to 'FETCH_CATEGORIES_START' type
// dispatched to the reducer and fires fetchCategoriesAsync function, outlined above
// 'take' - is for receiving actions.
// 'takeLatest' is saying 'whenever you receive a bunch of the same action types, give me the latest one
// below reads as 'whenever we take the latest FETCH_CATEGORIES_START action, we're going to initialize fetchCategoriesAsync Saga
export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

// exports the categoriesSaga to the rootSaga:
// 'all' means 'run everything inside and only complete when everything is done' 
// 'call' - calls a function execution
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}