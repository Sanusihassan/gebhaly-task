import { CartItemModel } from "../models/cart-models";

export const deleteCartItem = async (itemId: string) => {
  await CartItemModel.deleteOne({ id: itemId });
};