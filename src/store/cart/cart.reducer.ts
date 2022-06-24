/* ------------ IMPORTS ------------- */

import { AnyAction } from 'redux';

import { CartItem } from './cart.types';
import { setIsCartOpen, setCartItems } from './cart.action';

/* ------------ TYPES ------------- */

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
}

/* ------------ REDUCER ------------- */

// Initial State
export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems:[]
}

// Reducer Function
export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  
    if (setCartItems.match(action)) {
      return { ...state, cartItems: action.payload }; // action that matches 'setCartItems' type
     }
    if (setIsCartOpen.match(action)) {
      return { ...state, isCartOpen: action.payload }; // action that matches 'setCartItems' type
    }
    return state;
}