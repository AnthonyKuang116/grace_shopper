import React, { useState, useEffect } from "react";
import { Header, Main, Product } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
const App = () => {
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();

      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Main {...{ products, setModalProduct, setOpenProduct }} />
      <Product {...{ modalProduct, openProduct, setOpenProduct }} />
    </div>
  );
};
export default App;
