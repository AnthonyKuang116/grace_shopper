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

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send({products});
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const { category, subCategory, name, description, price, quantity, imgSrc } =
      req.body;
    const newProduct = await createProduct({
      category,
      subCategory,
      name,
      description,
      price,
      quantity,
      imgSrc,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, subCategory, name, description, price, quantity, imgSrc } = req.body;
    const updatedProduct = await updateProduct(id, {
      category,
      subCategory,
      name,
      description,
      price,
      quantity,
      imgSrc,
    });
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = deleteProduct(id);
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
