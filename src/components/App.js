import React, { useState, useEffect } from "react";
import { Header, Main } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
const App = () => {
  const [products, setProducts] = useState([]);

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
      <Main {...{ products }} />
    </div>
  );
};
export default App;
