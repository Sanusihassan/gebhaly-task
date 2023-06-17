import { model } from "mongoose";
import { CartItem } from "../handlers/add-to-cart";
import { cartItemSchema } from "../schema/cart-schema";
export const CartItemModel = model<CartItem>('CartItem', cartItemSchema);