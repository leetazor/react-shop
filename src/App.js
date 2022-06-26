/*------ IMPORTS ------ */

import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route} from 'react-router-dom';

import Spinner from './components/spinner/spinner.component';
import { checkUserSession } from './store/user/user.action';

/*------ LAZY LOADING FOR THE COMPONENTS ------ */

const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));

/*------ COMPONENT ------ */

const App = () => {  
  const dispatch = useDispatch();

  //Observable Listener - takes care of User Auth with Firebase
  useEffect(() => {
    //this will dispatch checkUserSession Action that will trigger onCheckUserSession Saga
     dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index={true} element={<Home />} />
          <Route  path='shop/*' element={<Shop />} />
          <Route  path='auth' element={<Authentication />} />
          <Route  path='checkout' element={<Checkout />} />
        </Route> 
      </Routes>
    </Suspense>    
  );
};

export default App;
