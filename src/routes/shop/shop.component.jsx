import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';

import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {      
    return (
      <Routes>
        <Route index element={ <CategoriesPreview /> } />
        {/* :parameter creates an object accessible ftom the component it links to (by using useParams hook),
          with a key = parameter and a value, matching to the dynamic link that leads to that component.
          In this case, the dynamic link is generated inside CategoryPreview component from the dynamic 'title' */}
        <Route path=":category" element={ <Category /> } />
      </Routes>
    );
  };

  export default Shop;