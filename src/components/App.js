import React, { useState, useEffect } from "react";
import { Header, Main, Product } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
import { getCurrentUser } from "../auth";
import ViewUsers from './ViewUsers';
import AdminAddProduct from './AdminAddProduct';


const App = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [modalProduct, setModalProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);
  const [currentSearchText, setCurrentSearchText] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [openUsers, setOpenUsers] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();
      console.log("All Products", data)
      setProducts(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
  }, [currentUser])

  const handleSearchTextChange = (e) => {
    const newSearchText = e.currentTarget.value;
    setCurrentSearchText((oldSearchText) => {
      console.log(newSearchText)
      return newSearchText;
    })
  };

  const handleSubCategoryChange = (event) => {
    event.preventDefault();
    const subCategorySearch = event.target.value;
    setSubCategory(() => {
      return subCategorySearch;
    })
  }

  const filteredProducts = () => {
    let filteredResults = products;

    if (currentSearchText) {
      let searchTextLower = currentSearchText.toLowerCase()
      filteredResults = filteredResults.filter((item) => {
        return item.name.toLowerCase().includes(searchTextLower)
      })
    }

    if (subCategory.length) {
      filteredResults = filteredResults.filter((item) => {
        return subCategory.some(search => item.subCategory.startsWith(search))
      })
    }
    return filteredResults;
  }

  return (
    <div className="App">
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentSearchText={currentSearchText}
        handleSearchTextChange={handleSearchTextChange}
        products={products}
        setProducts={setProducts}
        handleSubCategoryChange={handleSubCategoryChange}
        subCategory={subCategory}
        setOpenUsers={setOpenUsers}
        setAddProduct={setAddProduct}
      />
      <Main {...{ setModalProduct, setOpenProduct }} products={filteredProducts()} />
      <Product {...{ modalProduct, openProduct, setOpenProduct }} />
      <ViewUsers openUsers={openUsers} setOpenUsers={setOpenUsers}/>
      <AdminAddProduct {...{addProduct, setAddProduct}}/>
    </div>
  );
};
export default App;
