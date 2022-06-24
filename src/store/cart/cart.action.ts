/* --------- IMPORTS ---------- */

import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

/* --------- ACTION TYPES ---------- */

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

/* ----------- ACTION GENERATING FUNCTIONS ------------ */

// We wrap these functions into Matcher

// action to set the value of isCartOpen boolean in the cart reducer:

 export const setIsCartOpen = withMatcher((isCartOpen: boolean): SetIsCartOpen => 
 createAction( CART_ACTION_TYPES.TOGGLE_CART_OPEN, isCartOpen ));

// the functions below receive current cart items from the state, apply the appropriate helper function to those items
// and return an action with an appropriate type and payload of new cart items that are being sent to the reducer

// for these, we need to first create SetCartItems Action Creator

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd );
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove );
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear );
  return setCartItems(newCartItems);
};

/* ----- HELPER FUNCTIONS - 3 Action Generating Functions above depend on them ------ */

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increment quantity
  if(existingCartItem) {
      return cartItems.map((cartItem) =>
          cartItem.id === productToAdd.id ? 
          {...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
  }
  // return new array with modified cartItems / new cart item
  return [ ...cartItems, {...productToAdd, quantity: 1 }]
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[]  =>  {
 // find the cart item to remove
 const existingCartItem = cartItems.find(
  (cartItem) => cartItem.id === cartItemToRemove.id
 );
 // check if the existing item is the cart and if the quantity of that item is equal to 1
 // if it is - remove that item from the cart
 if(existingCartItem && existingCartItem.quantity === 1) {
     return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
 }
 // return back cartItems with matching cart item with reduced quantity
 return cartItems.map((cartItem) =>
 cartItem.id === cartItemToRemove.id ? 
 {...cartItem, quantity: cartItem.quantity - 1 }
 : cartItem
 );
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}