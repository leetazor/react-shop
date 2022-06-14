
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { isCartOpen } from '../../store/cart/cart.selector' ;
import { selectCartCount } from '../../store/cart/cart.selector';

import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';



import './cart-icon.styles.scss';

const CartIcon = () => {
  const dispatch = useDispatch();  

  const cartCount = useSelector(selectCartCount);
  
  // toggle function - it calls setIsCartOpen method to set isCartOpen value to the opposite value
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
      <div className="cart-icon-container" onClick={toggleIsCartOpen} >
          < ShoppingIcon className="shopping-icon" />
          <span className="item-count">{cartCount}</span>
      </div>
  )
}

export default CartIcon;