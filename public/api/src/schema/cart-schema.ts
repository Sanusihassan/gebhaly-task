import { Schema } from "mongoose";
import { CartItem } from "../handlers/add-to-cart";

export const cartItemSchema = new Schema<CartItem>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});
