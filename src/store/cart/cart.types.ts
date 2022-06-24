import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  TOGGLE_CART_OPEN = 'cart/TOGGLE_CART_OPEN'
}

// Intersection type - CartItem Type + Additional unnamed type with 'quantity' on it
export type CartItem = CategoryItem & {
  quantity: number;
}