import { CartItemModel } from "../models/cart-models";
import { CartItem } from "./add-to-cart";


export async function getCardItems(): Promise<CartItem[]> {
    try {
      const cartCollections = await CartItemModel.find().lean<CartItem[]>().exec();
      return cartCollections;
    } catch (err) {
      console.warn('Error retrieving card collections:', err);
      return [];
    }
  }