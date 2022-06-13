import { createSelector } from 'reselect';

//Categories Memoization
const selectCategoryReducer = (state) => state.categories;

//Only if the selected categories are different, the process of 'reducing' categories woill run.
//otherwise the cached categories will be provided
export const selectCategories= createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);


export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('selector fired');
    return categories.reduce((accumulator, category) => {             
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {})
  }  
);