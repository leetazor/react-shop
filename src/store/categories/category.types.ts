
// by default, actions inside of this object are strings
// we need to convert them into ENUM type
// ENUM is a TypeScript extended data type
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAIL = 'category/FETCH_CATEGORIES_FAIL'
};

// Generic Category Item Type:
export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

// Generic Category Type:
export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
}

//Category Map Type:
export type CategoryMap = {
  // the key is a string of any value
  [key: string]: CategoryItem[];
}