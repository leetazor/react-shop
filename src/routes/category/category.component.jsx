import { useContext, useState, useEffect, Fragment } from 'react';

// this hook is used for generating url path from parameters
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
  //we are de-structuring { category } from the return of useParams();
  const { category } = useParams();
 
  const {categoriesMap} = useContext(CategoriesContext);
  // we are not using an empty state here by default, instead we are using categoriesMap, because by default categoriesMap is an empty object (and has no products)
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
     setProducts(categoriesMap[category]);
  }, [category, categoriesMap]); 

  return (
    <Fragment>
    <h2 className="category-title">{category.toUpperCase()}</h2>
    <div className="category-container">      
      {/* because we are getting our products from a database, this step is asynchronous,
       so we must only render our products based on the condition, that the products are present */}
      {products &&
        products.map((product) => <ProductCard key={product.id} product={product} /> )
      }
    </div>
    </Fragment>
  )

};

export default Category;