import { Schema, model, Document } from 'mongoose';
import type { Product } from "./insert-initial-data";
import { cartItemSchema } from '../schema/cart-schema';
export type CartItem = Document & Product;

const CartItemModel = model<CartItem>('cartitem', cartItemSchema);

export async function addToCart(items: { cart: CartItem[] }) {
  try {
    for (const item of items.cart) {
      const newItem = {
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        quantity: item.quantity,
      };
      const filter = { id: item.id };
      const update = { $inc: { quantity: item.quantity } };
      const options = { new: true, upsert: true };
      const result = await CartItemModel.findOneAndUpdate(filter, update, options);
      if (!result) {
        throw new Error(`Item not found in cart for id: ${item.id}`);
      }
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
}