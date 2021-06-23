const cartRouter = require("express").Router();
const {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  updateCartQuantity,
  emptyCart,
} = require("../db");

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");

  next();
});

cartRouter.get("/cart", (req, res, next) => {
  try {
    const { user } = req.body;
    const cart = await getUserCart(user);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/cart/:id/:quantity", async (req, res, next) => {
  try {
    const { id, quantity } = req.params;
    const { user } = req.body;
    const product = await addProductToCart(id, user, quantity);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

cartRouter.patch("/cart/:id/:quantity", async (req, res, next) => {
  try {
    const { id, quantity } = req.params;
    const { user } = req.body;
    const product = await updateCartQuantity(id, user, quantity);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/cart/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const product = await removeProductFromCart(id, user);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/cart", (req, res, next) => {
  try {
    const { user } = req.body;
    const cart = emptyCart(user);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
