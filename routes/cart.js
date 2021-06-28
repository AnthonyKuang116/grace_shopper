const cartRouter = require("express").Router();
const {
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  updateCartQuantity,
  emptyCart,
  getCheckout
} = require("../db");

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");

  next();
});

cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getCheckout(userId);
    res.send(cart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.post("/:productId/:quantity", async (req, res, next) => {
  try {
    const { productId, quantity } = req.params;
    const { userId, price } = req.body;
<<<<<<< HEAD
    const cart = await getUserCart(userId);
    console.log(cart);
    const cartId = cart.id;

    const product = await addProductToCart({
      cartId,
      productId,
      quantity,
      price,
    });

=======

    console.log("params", req.params)

    console.log("body", req.body)

    const cart = await getUserCart(userId)
    console.log("cart", cart)
    const product = await addProductToCart(cart.id, productId, quantity, price);
    console.log("product", product)
>>>>>>> 91cf88e1c45a2d259381c4e4d49aad328e179d34
    res.send(product);
  } catch ({ name, message }) {
    throw { name, message };
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
    const product = await removeProductFromCart(productId, userId);
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

module.exports = cartRouter;
