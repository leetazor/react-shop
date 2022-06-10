import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
   categoriesMap: {},
});
 
export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    //pulls the categories and products from the Firestore database
    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoryMap);   
      }
      getCategoriesMap();
    }, []);

    //below Effect writes all collecitons and products from a js file into the Firestore Database, we only need to do it once
    //import SHOP_DATA from '../shop-data.js';
    // useEffect(() => {
    //   addCollectionAndDocuments('categories', SHOP_DATA)
    // }, []);
   

    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}>
          {children}
        </CategoriesContext.Provider>
    )
}