import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFail } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';


export function* fetchCategoriesAsync() {
  try {
    // the below is similar to 'async' - 'wait until we get something from the callback function below',
    //'categories' parameter is passed with a coma.
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // 'put' is used instead of 'dispatch' in generator Sagas functions:
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFail(error));
  }  
}

// the below function is listening to 'FETCH_CATEGORIES_START' type
// dispatched to the reducer and fires fetchCategoriesAsync function, outlined above
export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

// exports the categoriesSaga to the rootSaga:
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}