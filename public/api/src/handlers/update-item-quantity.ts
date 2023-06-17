import { Schema, Document } from 'mongoose';
import type { Product } from "./insert-initial-data";
import { CartItemModel } from '../models/cart-models';
type CartItem = Document & Product;



export async function updateCartItemQuantity(itemId: number, quantity: number) {
  try {
    const cartItem = await CartItemModel.findOne({ id: itemId });
    if (!cartItem) {
      throw new Error(`Could not find cart item with id ${itemId}`);
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    console.log(`Quantity updated for cart item ${cartItem.name}: ${cartItem.quantity}`);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
}