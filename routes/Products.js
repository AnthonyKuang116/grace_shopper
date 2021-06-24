const productsRouter = require("express").Router();

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../db");

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");

  next();
});

productsRouter.get("/products", (req, res, next) => {
  try {
    const products = getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/products", async (req, res, next) => {
  try {
    const { category, subCategory, title, description, price, onHand, imgSrc } =
      req.body;
    const newProduct = await createProduct({
      category,
      subCategory,
      title,
      description,
      price,
      onHand,
      imgSrc,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/products/:id", async (req, res, next) => {
  try {
    const { category, subCategory, title, description, price, onHand, imgSrc } =
      req.body;
    const updatedProduct = await updateProduct({
      category,
      subCategory,
      title,
      description,
      price,
      onHand,
      imgSrc,
    });
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/products/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = deleteProduct(id);
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
