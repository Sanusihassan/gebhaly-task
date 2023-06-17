"use client";
import Navbar from "./NavBar";
import ProductList from "./ProductList";
import "../scss/main.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/get-products").then((res) => {
      setProducts(res.data);
      setShowLoader(false);
    });
  }, []);
  return (
    <main>
        <Navbar />
        {
          showLoader ? <Loader /> : null
        }
        <ToastContainer position="top-right" />
        <ProductList products={products} />
    </main>
  );
}
