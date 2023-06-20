"use client";
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Product } from "../../types"

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  cart: CartItem[];
}

const initialState: AppState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: AppState, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        state.cart = updatedCart;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state: AppState, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const updatedCart = state.cart.filter((cartItem) => cartItem.id !== itemId);
      state.cart = updatedCart;
    },
    
    updateCartItemQuantity: (state: AppState, action: PayloadAction<{itemId: number, quantity: number}>) => {
      const { itemId, quantity } = action.payload;
      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem.id === itemId) {
          return {
            ...cartItem,
            quantity: quantity,
          };
        }
        return cartItem;
      });
      state.cart = updatedCart;
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});


const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
export { store, addToCart, removeFromCart, updateCartItemQuantity };
