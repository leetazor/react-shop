import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';

import Category from '../category/category.component';
import { fetchCategoriesAsync } from '../../store/categories/category.action';

import './shop.styles.scss';

const Shop = () => {   
    const dispatch = useDispatch();

    //pulls the categories and products from the Firestore database
    useEffect(() => {  
      //dispatching an Async function with Redux-Thunk Async Action
      //(which is a function - Redux Thunk works with it) and has no type
      dispatch(fetchCategoriesAsync());   
    }, []);
  
    return ( 
        <Routes>
          <Route index element={ <CategoriesPreview /> } />
          <Route path=":category" element={ <Category /> } />
        </Routes>
    );
  };

  export default Shop;