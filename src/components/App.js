import React, { useState, useEffect } from "react";
import { Header, Main } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
import { getCurrentUser } from "../auth";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

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
      <Main {...{ products }} />
    </div>
  );
};
export default App;
