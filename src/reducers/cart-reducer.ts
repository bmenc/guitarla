import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export type CartActions = 
  { type: 'add-to-cart', payload: { item: Guitar } } |
  { type: 'remove-from-cart', payload: { item: Guitar['id'] } } |
  { type: 'decrease-quantity', payload: { item: Guitar['id'] } } |
  { type: 'increase-quantity', payload: { item: Guitar['id'] } } |
  { type: 'clear-cart' }

export type CartState = {
  data: Guitar[]
  cart: CartItem[]
}
export const initialState: CartState = {
  data: db,
  cart: []
}

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  const MAX_ITEMS = 5;

  switch (action.type) {
    case "add-to-cart": {
      const itemExists = state.cart.findIndex(guitar => guitar.id === action.payload.item.id);
      let updatedCart : CartItem[] = [];

      if (itemExists >= 0) {
        if (state.cart[itemExists].quantity < MAX_ITEMS) {
          updatedCart = state.cart.map((guitar, index) => index === itemExists
            ? { ...guitar, quantity: guitar.quantity + 1 }
            : guitar
          );
        } else {
          updatedCart = state.cart;
        }
      } else {
        const newItem: CartItem = { ...action.payload.item, quantity: 1 };
        updatedCart = [...state.cart, newItem];
      }

      return {
        ...state,
        cart: updatedCart
      }
    }
    case "remove-from-cart": {
      return {
        ...state
      }
    }
    case "decrease-quantity": {
      return {
        ...state
      }
    }
    case "increase-quantity": {
      return {
        ...state
      }
    }
    case "clear-cart": {
      return {
        ...state
      }
    }
  
    default: return state;
  }
}
