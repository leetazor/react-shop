import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';

import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';

const CategoriesPreview = () => {  
    const isLoading = useSelector(selectCategoriesIsLoading);
    const categoriesMap = useSelector(selectCategoriesMap);
  
    return (
      <Fragment> 
        {/* below is an example of conditional rendering based on the boolean value of
        'isLoading' inside of the caregories reducer */}
        { isLoading ? (
        <Spinner />
         ) : (Object.keys(categoriesMap).map(title => {
            const products = categoriesMap[title];          
              return (
              <CategoryPreview key={title} title={title} products={products} />
              );
          }))
        }
      </Fragment>
    );
  };

  export default CategoriesPreview;