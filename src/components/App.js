import React, { useState, useEffect } from "react";
import { Header, Main } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
import { getCurrentUser } from "../auth";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [modalProduct, setModalProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();

      setProducts(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if(!currentUser) {
      return;
    }
  }, [currentUser])

  return (
    <div className="App">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Main {...{ products, setModalProduct, setOpenProduct }} />
      <Product {...{ modalProduct, openProduct, setOpenProduct }} />
    </div>
  );
};
export default App;
