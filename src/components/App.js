import React, { useState, useEffect } from "react";
import { Header, Main, Product, Cart } from "./";
import getAllProducts from "../api/products/getAllProducts.js";
import { getCurrentUser } from "../auth";
import ViewUsers from "./ViewUsers";
import AdminAddProduct from "./AdminAddProduct";
import AdminEditProduct from "./AdminEditProduct";
import getUserCart from "../api/cart/getUserCart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(1);
  const [modalProduct, setModalProduct] = useState(null);
  const [openProduct, setOpenProduct] = useState(false);
  const [userCart, setUserCart] = useState(null);
  const [currentSearchText, setCurrentSearchText] = useState("");
  const [subCategory, setSubCategory] = useState([]);

  const [openCart, setOpenCart] = useState(false);

  const [openUsers, setOpenUsers] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  //get all products and set the product state
  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      console.log("All Products", data);
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

  const handleSearchTextChange = (e) => {
    const newSearchText = e.currentTarget.value;
    setCurrentSearchText((oldSearchText) => {
      console.log(newSearchText);
      return newSearchText;
    });
  };

  const handleSubCategoryChange = (event) => {
    event.preventDefault();
    const subCategorySearch = event.target.value;
    setSubCategory(() => {
      return subCategorySearch;
    });
  };

  const filteredProducts = () => {
    let filteredResults = products;

    if (currentSearchText) {
      let searchTextLower = currentSearchText.toLowerCase();
      filteredResults = filteredResults.filter((item) => {
        return item.name.toLowerCase().includes(searchTextLower);
      });
    }

    if (subCategory.length) {
      filteredResults = filteredResults.filter((item) => {
        return subCategory.some((search) =>
          item.subCategory.startsWith(search)
        );
      });
    }
    return filteredResults;
  };

  return (
    <div className="App">
      <Header
        {...{
          userCart,
          currentUser,
          setCurrentUser,
          currentSearchText,
          handleSearchTextChange,
          products,
          setProducts,
          handleSubCategoryChange,
          subCategory,
          setOpenCart,
          setOpenUsers,
          setAddProduct,
          setEditProduct
        }}
      />
      <Main
        {...{ userCart, currentUser, setModalProduct, setOpenProduct }}
        products={filteredProducts()}
      />
      <Product {...{ modalProduct, openProduct, setOpenProduct }} />

      {userCart ? (
        <Cart {...{ products, openCart, setOpenCart, userCart }} />
      ) : (
        ""
      )}

      <ViewUsers openUsers={openUsers} setOpenUsers={setOpenUsers} />
      <AdminAddProduct {...{ addProduct, setAddProduct }} />
      <AdminEditProduct {...{editProduct, setEditProduct}}/>
    </div>
  );
};
export default App;
