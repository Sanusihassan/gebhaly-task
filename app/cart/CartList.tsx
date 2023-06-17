import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, CartItem, removeFromCart, updateCartItemQuantity } from "../Redux/store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";

function CartList() {
  const dispatch = useDispatch();
  const cartState = useSelector((state: AppState) => state.cart);
  const cart = (cartState as unknown as { cart: CartItem[] }).cart;
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItemQuantity, setEditingItemQuantity] = useState<number | null>(
    null
  );
  const handleRemoveItem = (itemId: number) => {
    // Remove item from cart in store
    dispatch(removeFromCart(itemId));
    // Remove item from cart in database
    axios.delete(`http://localhost:5000/delete-cart-item/${itemId}`)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleEditItem = (itemId: number) => {
    setEditingItemId(itemId);
    setEditingItemQuantity(
      cart.find((item: CartItem) => item.id === itemId)?.quantity || 0
    );
  };

  const handleCancelEditItem = () => {
    setEditingItemId(null);
    setEditingItemQuantity(null);
  };

  const handleUpdateItemQuantity = (itemId: number, quantity: number) => {
    dispatch(updateCartItemQuantity({itemId, quantity}));
    // update the database
    axios.put("http://localhost:5000/update-cart-item-quantity", {itemId, quantity});
    setEditingItemId(null);
    setEditingItemQuantity(null);
  };

  const handleQuantityInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingItemQuantity(parseInt(event.target.value));
  };

  // Calculate the total value of the cart
  const total = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      <List>
        {cart.map((item: CartItem) => (
          <ListItem key={item._id} sx={{ py: 2 }}>
            <ListItemAvatar sx={{ mr: 2 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price.toFixed(2)}`}
              sx={{ mr: "auto" }}
            />
            {editingItemId === item.id ? (
              <div>
                <IconButton
                  onClick={() =>
                    handleUpdateItemQuantity(item.id, editingItemQuantity || 0)
                  }
                  sx={{ mr: 1 }}
                >
                  <AddIcon />
                </IconButton>
                <TextField
                  type="number"
                  value={editingItemQuantity}
                  onChange={handleQuantityInputChange}
                  sx={{ mx: 1, width: "3ch", textAlign: "center" }}
                />
                <IconButton onClick={handleCancelEditItem} sx={{ mr: 1 }}>
                  <CloseIcon />
                </IconButton>
              </div>
            ) : (
              <div>
                <div>
                  <IconButton
                    onClick={() =>
                      handleUpdateItemQuantity(item.id, item.quantity + 1)
                    }
                    sx={{ mr: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "inline-block", fontWeight: "bold", mr: 1 }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      handleUpdateItemQuantity(item.id, item.quantity - 1)
                    }
                    sx={{ mr: 1 }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              </div>
            )}
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleRemoveItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>
    </div>
  );
}

export default CartList;
