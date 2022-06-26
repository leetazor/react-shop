/* --------- IMPORTS ---------- */

import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

import './category.styles.scss';

/* --------- TYPES ---------- */

type CategoryRouteParams = {
  category: string;
}

/* --------- COMPONENT ---------- */

// this Category can only be rendered if the Route matches the URL parameter
// this Component will never render, unless useParams is present
const Category = () => {
  // here we are telling useParams to only take keys of the CategoryRouteParams type
  // by using 'as CategoryRouteParams' we are telling useParams that there are definitely going to be those parameters, so 'category' will never end up being 'undefined'.
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
     setProducts(categoriesMap[category]);
  }, [category, categoriesMap]); 

  return (
    <Fragment>
    <h2 className="category-title">{category.toUpperCase()}</h2>
      {
        isLoading ? <Spinner /> :
        <div className="category-container">      
          {
          products && products.map((product) =>
            <ProductCard key={product.id} product={product} /> )
          }
        </div>
      }
    </Fragment>
  )

};

export default Category;