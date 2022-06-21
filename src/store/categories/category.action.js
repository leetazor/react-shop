import { CATEGORIES_ACTION_TYPES } from './category.types';

import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// Normal Actions
export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFail = (error) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);

// Redux Thunk Async Action:
// This Thunk Action is receiving dispatch and dispatches new actions inside of it,
// based on success or failure of the asynchronous event
export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments('categories');
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFail(error));
  }  
};