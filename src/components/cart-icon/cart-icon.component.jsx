
import { useContext } from 'react';

import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context'

import './cart-icon.styles.scss';

const CartIcon = () => {
  
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);  

  
  // toggle function - it calls setIsCartOpen method to set isCartOpen value to the opposite value
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
      <div className="cart-icon-container" onClick={toggleIsCartOpen} >
          < ShoppingIcon className="shopping-icon" />
          <span className="item-count">{cartCount}</span>
      </div>
  )
}

export default CartIcon;