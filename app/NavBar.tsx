"use client";

import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge,styled } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import type { AppState, CartItem } from './Redux/store';
import axios from "axios";

const WhiteAppBar = styled(AppBar)({
  backgroundColor: 'white',
});



const Navbar = () => {
  const cartState = useSelector((state: AppState) => state.cart);
  useEffect(() => {
    if((cartState as unknown as {cart: CartItem[]}).cart.length > 0) {
      axios.post("http://localhost:5000/add-to-cart", cartState).then(res => {
        // console.log(res);
      }).catch(err => {
        // 
      })
    }
  }, [cartState])
  return (
    <WhiteAppBar position="fixed">
      <Toolbar>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Link href="/" style={{
            textDecoration: "none"
          }}>Gebhaly Shop</Link>
        </div>
        <div style={{flexGrow: 1}}></div>
        <IconButton aria-label="View cart">
          <Link href="/cart" style={{
            color: "rgba(0, 0, 0, 0.54)"
          }}>
            <Badge badgeContent={`${(cartState as unknown as {cart: CartItem[]}).cart.length || 0}`} color="secondary">
              <LocalGroceryStoreIcon />
            </Badge>
          </Link>
        </IconButton>
      </Toolbar>
    </WhiteAppBar>
  );
};


export default Navbar;