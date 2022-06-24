/* --------- IMPORTS ---------- */

import { CATEGORIES_ACTION_TYPES, Category } from './category.types';
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

/* --------- ACTION TYPES ---------- */

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess =
ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFail =
ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, Error>;

// Discriminating Union - not used, we used Matchable actions instead
// export type CategoryAction =
// FetchCategoriesStart |
// FetchCategoriesSuccess |
// FetchCategoriesFail;

/* ----------- ACTIONS ------------ */

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFail = withMatcher((error: Error): FetchCategoriesFail => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error));

