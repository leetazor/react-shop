/*
import { createContext, useReducer } from 'react';

import {createAction} from '../utils/reducer/reducer.utils';

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



// Provider Component
export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const {cartItems, isCartOpen, cartCount, cartTotal} = state;

    // Generates newCartTotal, newCartCount and dispatches all of it together with newCartItems to the cartReducer
    const updateCartItemsReducer = (newCartItems) => {
       
      dispatch(
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount
        })
      );       
    };  
 

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

*/