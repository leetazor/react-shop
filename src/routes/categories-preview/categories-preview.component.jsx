import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {  
    const { categoriesMap } = useContext(CategoriesContext);
    // <></> = shorthand for <Fragment></Fragment> 
    return (
      <Fragment> 
        {/* Object.keys returns us an array of keys, 
        we can then map ove that array of keys, using Array.prototype.map */}
        {Object.keys(categoriesMap).map(title => {
         {/* we are extracting products array from each 'title' key inside
          categoriesMap object */}  
          const products = categoriesMap[title];   
         {/* and then we are returning a CategoryPreview component for each
          'title' key inside categoriesMap object by mapping through them,
           passing the title and products array into each. */}         
          return <CategoryPreview key={title} title={title} products={products} />
        })}     
      </Fragment>      
    );
  };

  export default CategoriesPreview;