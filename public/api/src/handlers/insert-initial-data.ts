import fs from "fs";
import path from "path";
import mongoose, { Document, Model } from "mongoose";

export interface Product extends Document {
  _id: import("mongoose").Types.ObjectId;
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

export type ProductDocument = Product & Document;

export const productSchema = new mongoose.Schema<Product>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ProductModel: Model<ProductDocument> = mongoose.model(
  "Products",
  productSchema
);

export async function seedProducts(): Promise<void> {
  const dataPath = path.join(__dirname, "../..", "data.json");
  const initialData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const count = await ProductModel.countDocuments();
  if (count == 0) {
    try {
      const result = await ProductModel.insertMany(initialData);
      console.log(
        `Inserted ${result.length} documents into the "Products" collection`
      );
    } catch (error) {
      console.error("Error inserting documents:", error);
    }
  }
}
