/**
 * i want a similar function but to get all of the card collection
 */
import mongoose from 'mongoose';
import { Product } from './insert-initial-data';
import { productSchema } from './insert-initial-data';


const db = mongoose.connection;
const ProductModel = db.model('Products', productSchema);

async function getDocuments(): Promise<Product[]> {
  try {
    const products = await ProductModel.find().lean<Product[]>().exec();
    return products;
  } catch (err) {
    console.warn('Error retrieving documents:', err);
    return [];
  }
}

export { getDocuments };