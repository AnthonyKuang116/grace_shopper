const cartRouter = require("express").Router();
const {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  updateCartQuantity,
  emptyCart,
  closeCart,
  createCart,
  // getCheckout,
} = require("../db");

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");

  next();
});

cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getUserCart(userId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.post("/:productId/:quantity", async (req, res, next) => {
  try {
    const { productId, quantity } = req.params;
    const { userId, price } = req.body;
    const cart = await getUserCart(userId);
    const cartId = cart.id;
    const product = await addProductToCart({
      cartId,
      productId,
      quantity,
      price,
    });
    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.patch("/:productId/:quantity", async (req, res, next) => {
  try {
    const { productId, quantity } = req.params;
    const { userId } = req.body;
    const cart = await getUserCart(userId);

    const product = await updateCartQuantity(cart.id, productId, quantity);
    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.delete("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const cart = await getUserCart(userId);

    const product = await removeProductFromCart(cart.id, productId);
    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.delete("/", (req, res, next) => {
  try {
    const { userId } = req.body;
    const cart = emptyCart(userId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.patch("/:cartId", (req, res, next) => {
  try {
    const { cartId } = req.params;
    const cart = closeCart(cartId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
cartRouter.post("/", (req, res, next) => {
  try {
    const { userId } = req.body;
    const cart = createCart(userId);
    res.send(cart);
  } catch ({ name, message }) {
    next({
      name,
      message,
    });
  }
});
module.exports = cartRouter;
