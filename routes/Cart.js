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

cartRouter.get("/cart/:id", (req, res, next) => {
  try {
    const { userId } = req.body;
    const cart = await getUserCart(userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/cart/:productId/:quantity", async (req, res, next) => {
  try {
    const { cartId, productId, quantity, price } = req.params;
    const product = await addProductToCart(cartId, productId, quantity, price);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

cartRouter.patch("/cart/:productId/:quantity", async (req, res, next) => {
  try {
    const { productId, quantity } = req.params;
    const { userId } = req.body;
    const cart = getUserCart(userId);

    const product = await updateCartQuantity(cart.cartId, productId, quantity);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/cart/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const product = await removeProductFromCart(productId, userId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/cart", (req, res, next) => {
  try {
    const { userId } = req.body;
    const cart = emptyCart(userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
