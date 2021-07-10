import React, { useState, useEffect } from "react";
import { Header, Main, Product } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
import { getCurrentUser } from "../auth";
import getUserCart from "../api/cart/getUserCart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(1);
  const [modalProduct, setModalProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);
  const [userCart, setUserCart] = useState([]);

  //get all products and set the product state
  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  //get user cart id and products in that cart
  useEffect(() => {
    async function fetchCart() {
      const data = await getUserCart(currentUser);
      setUserCart(data);
    }
    if (currentUser) fetchCart();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
  }, [currentUser]);

  return (
    <div className="App">
      <Header {...{ products, userCart, currentUser, setCurrentUser }} />
      <Main
        {...{
          userCart,
          currentUser,
          products,
          setModalProduct,
          setOpenProduct,
        }}
      />
      <Product {...{ modalProduct, openProduct, setOpenProduct }} />
    </div>
  );
};
export default App;
