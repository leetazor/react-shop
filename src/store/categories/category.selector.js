// the createSelector method allows us to create Memoized selectors to avoid triggering unnecessary re-renders if the result of the selection is the same
import { createSelector } from 'reselect';

// this is just the initial selector that is going to give us back just the slice of the Slobal State (kept in Store) that we need, 
// in this particular case we only need the 'categories' part of the Store:
// (this selection is not memoized)
const selectCategoryReducer = (state) => state.categories;

// Memoized Selector:

export const selectCategories = createSelector(
  // array of 'input selectors' (above we created one selector to go into this array).
  // we can use several slices of our Global store to go into this array:
  [selectCategoryReducer],
  // the agrument(s) of the below is(are) the output/return of the 'input' selector(s), used in the above array:
  // the below selection is memoized. The only way it will run is if the output of the above selector(s) is(are) different
  (categoriesSlice) => categoriesSlice.categories
);

// we can run the output of the first memoized selection through another Selection Memoization, like below:
// Only if categoriesSlice from the above selector is different, the process of 'reducing' categories will run.
// otherwise the categoriesSlice will be provided

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
