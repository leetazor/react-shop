import { createSelector } from "reselect";

// initial selector for 'Reselect' library
const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const isCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// instead of keeping Cart Count inside the Global State, like we did with Context,
// we are calculating it on the flight through this Selector and memoizing it, to avoid unnecessary re-running this function
// we're using the selectCartItems selector result here, to perform calculations on the selected items
export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0)
);

// we're doing here same as what we do with the above Cart Count Selector
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0)
);
