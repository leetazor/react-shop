/* ------------ IMPORTS ------------- */
import { AnyAction } from 'redux';

import { Category } from './category.types';
import {  
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail
} from './category.action';

/* ------------ TYPES ------------- */

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

/* ------------ REDUCER ------------- */

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  //to accomodate for thunk/sagas:
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction  
): CategoriesState => {
   if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true }; // action that matches 'fetchCategoriesStart' type
   }
   if (fetchCategoriesSuccess.match(action)) {
    return {...state, categories: action.payload, isLoading: false}; // action that matches 'fetchCategoriesSuccess' type
   }
   if (fetchCategoriesFail.match(action)) {
    return {...state, error: action.payload, isLoading: false}; // action that matches 'fetchCategoriesFail' type
   }

   return state;

};