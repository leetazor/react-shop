import { createContext, useState, useEffect } from 'react';

/* 
Cart's state keeps an array of items, added to cart, cart's total cost and cart's total items for us. Items are added to cart by passing ojects to the cart's array.
Add Item to Cart, Remove Item from Cart, Clear Item from Cart, as well as the cart total cost + total amount of items in cart are all calculated
from the items in the cat's 'state' (inside of the cart's context). 
So, whenever we are adding something to cart, we need to get the id of the item to add, check it against the items that are already 
in cart's state, and if it's there - increase the number of that cart item. 
If it's not there, we're simply adding the new object to the cart's array, setting it's quantity to 1.
*/

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

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
       const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
       setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
     }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd ));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove ));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear ));
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