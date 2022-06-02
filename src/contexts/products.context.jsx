import { createContext, useState, useEffect } from 'react';

//below two imports are for writing collections and products into the Firestore database - only need to do it once
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';


export const ProductsContext = createContext({
   products: [],
});

export const ProductsProvider = ({children}) => {
    
    const [products, setProducts] = useState([]);

    //below Effect writes all collecitons and products from a js file into the Firestore Database, we only need to do it once
    // useEffect(() => {
    //   addCollectionAndDocuments('categories', SHOP_DATA)
    // }, []);
   

    const value = {products};

    return (
        <ProductsContext.Provider value={value}>
          {children}
        </ProductsContext.Provider>
    )
}