import { createContext, useState, useEffect, useReducer } from 'react';

// Context
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

// Initial State
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems:[],
  cartCount: 0,
  cartTotal: 0
}

// Reducer Function
const cartReducer = (state, action) => {
  const { type, payload } = action;

    switch(type) {
      case 'SET_CART_ITEMS':
        return {
            ...state,
            ...payload
        };     
      default:
        throw new Error(`Unhandled type ${type} in cartReducer`)
  } 
}

const addCartItem = (cartItems, productToAdd) => {

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

const removeCartItem = (cartItems, cartItemToRemove) =>  {
   // find the cart item to remove
   const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
   );

   //check if quantity is equal to 1, if it is - remove that item from the cart
   if(existingCartItem.quantity === 1) {
       return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
   }
   // return back cartItems with matching cart item with reduced quantity
   return cartItems.map((cartItem) =>
   cartItem.id === cartItemToRemove.id ? 
   {...cartItem, quantity: cartItem.quantity - 1 }
   : cartItem
   );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

// Provider Component
export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const {cartItems, isCartOpen, cartCount, cartTotal} = state;

    // Generates newCartTotal, newCartCount and dispatches all of it together with newCartItems to the cartReducer
    const updateCartItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
      const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
       
      dispatch({
        type: 'SET_CART_ITEMS',
        payload: {
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount
        }
      });
       
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd );
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
      const newCartItems = removeCartItem(cartItems, cartItemToRemove );
      updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
      const newCartItems = clearCartItem(cartItems, cartItemToClear );
      updateCartItemsReducer(newCartItems);
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}