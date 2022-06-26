import { useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector' ;

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {

  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  
  // we are Memoizing this function with 'useCallback' from react 
  // (the actual function, not the retun from this function)
  // to avoid re-running it every time the component rerenders
  // dependencies are added to the array of dependencies
  // here, we know that the 'navigate' dependency will most probably never change (it will always go to /checkout in this case)
  // but React doesn't know it, so we might include it, so it doesn't throw a warning
  // but we might also not include it - no harm in this particular case
  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  }, [navigate] );

  return (
      <div className="cart-dropdown-container">
          <div className="cart-items">
            {
              cartItems.length ? (cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
              ))) : (
                <span>Your cart is empty</span>
              )
            }         
          </div>
          <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>      
      </div>
  )
}

export default CartDropdown;