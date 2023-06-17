"use client";
import Navbar from "../NavBar";
import "../../scss/main.scss";
import CartList from "./CartList";

export default function Home() {
  return (
    <main>
      <Navbar />
      <CartList />
    </main>
  );
}
