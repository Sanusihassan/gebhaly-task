import type { Product } from "../types"
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "./Redux/store"
import type { AppState, CartItem } from "./Redux/store"
import Fade from '@mui/material/Fade';
import axios from "axios"

interface Props {
  products: Product[];
}
const ProductList: FunctionComponent<Props> = ({ products }) => {
  const cartState = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/get-cartitems").then(res => {
      console.log(res.data);
      res.data.forEach((item: CartItem) => {
        dispatch(addToCart(item));
      });
    })
    setMounted(true);
    return () => {
      setMounted(false);
    }
  }, [])
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <Fade in={mounted}>
      <div className="product-list-container">
        <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ height: "100%", position: "relative" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{ minHeight: "200px", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      ${product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#9c27b0",
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fade>
  );
};
export default ProductList;
