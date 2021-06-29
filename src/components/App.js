import React, { useEffect, useState } from "react";
import { Main } from ".";
import getAllProducts from "../api/products/getAllProducts.js";
const App = () => {
  const [products, setProducts] = useState([]);
  console.log("hi");

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();

      console.log("products", data);
      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Main {...{ products }} />
    </div>
  );
};
export default App;
