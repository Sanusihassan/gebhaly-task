import express from 'express';
import mongoose from 'mongoose';
import { seedProducts } from "./handlers/insert-initial-data";
import { getDocuments } from "./handlers/get-documents";
import { addToCart } from "./handlers/add-to-cart";
import { updateCartItemQuantity } from "./handlers/update-item-quantity";
import { deleteCartItem } from './handlers/delete-cart-item';
import { getCardItems } from "./handlers/get-cart";

import cors from "cors";
const mongoUrl = 'mongodb+srv://sanusihassan122:lmXDegosOY6OKghx@cluster0.oyj3h0y.mongodb.net/shop?retryWrites=true&w=majority';
const app = express();
import bodyParser from 'body-parser';


app.use(cors());
app.use(bodyParser.json());

// password: lmXDegosOY6OKghx
mongoose.connect(mongoUrl, {
  serverSelectionTimeoutMS: 5000
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');
  await seedProducts()
});

// get-products handler
app.get('/get-products', async (req, res) => {
  const products = await getDocuments();
  res.json(products);
});
// get cart items handler
app.get('/get-cartitems', async (req, res) => {
  const cartItems = await getCardItems();
  res.json(cartItems);
});


// add-to-cart handler
app.post('/add-to-cart', (req, res) => {
  const item = req.body;
  addToCart(item);
});
// update-cart-item-quantity
app.put('/update-cart-item-quantity', async (req, res) => {
  const { itemId, quantity } = req.body;
  await updateCartItemQuantity(itemId, quantity);
});
// delete cart item
app.delete('/delete-cart-item/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    // Remove item from cart in database
    await deleteCartItem(itemId);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});