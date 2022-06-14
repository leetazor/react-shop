import { createSelector } from 'reselect';

//Categories Memoization

//this is the initial selector that is going to give us back just the slice of the reducer that we need, 
//in this particular case = categories
const selectCategoryReducer = (state) => state.categories;

//Memoized Selector

export const selectCategories = createSelector(
  // array of input selectors
  [selectCategoryReducer],
  //output selector
  (categories) => categories.categories
);

//Only if the selected categories are different, the process of 'reducing' categories will run.
//otherwise the cached categories will be provided

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
   // console.log('selector fired');
    return categories.reduce((accumulator, category) => {             
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {})
  }  
);