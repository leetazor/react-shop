/* ------------ IMPORTS ------------- */

import { createSelector } from "reselect";
import { CartState } from './cart.reducer';
import { RootState } from '../store';

/* ------------ PART OF THE STATE SELECTORS ------------- */

// initial selector for 'Reselect' library
const selectCartReducer = (state: RootState): CartState => state.cart;

/* ------------ MEMOIZED SELECTORS ------------- */

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const isCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0)
);
