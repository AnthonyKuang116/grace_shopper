import React from "react";

import {
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
import {
  createCart,
  closeCart,
  getUserCart,
  removeProductFromCart,
  updateCartQuantity,
} from "../api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  image: { maxWidth: "100px" },
  cartTitle: { fontFamily: "Roboto", color: "red" },
  cartLogin: {
    display: "grid",

    gridTemplateRows: "2fr 1fr ",
  },
  header: {
    gridRowStart: 2,
    gridRowEnd: 3,
    maxWidth: "8em",
  },
});

const Cart = ({
  currentUser,
  products,
  userCart,
  setUserCart,
  openCart,
  setOpenCart,
}) => {
  const TAX_RATE = 0.025;
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  function priceRow(qty, unit) {
    return qty * unit;
  }
  function subtotal(items) {
    return items
      .map(({ price, quantity }) => parseFloat(price) * quantity)
      .reduce((sum, i) => sum + i, 0);
  }

  const rows = userCart.products;
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleClose = () => {
    setOpenCart(false);
  };
  const handleDelete = async (productId) => {
    await removeProductFromCart(currentUser, productId);

    const newProducts = [...userCart.products].filter(
      (product) => product.productId != productId
    );

    const newCart = Object.assign({}, userCart);
    newCart.products = newProducts;
    setUserCart(newCart);
  };
  const handleQtyChange = async (quantity, productId) => {
    await updateCartQuantity(currentUser, productId, quantity);
    const newCart = { ...userCart };
    newCart.products = newCart.products.map((lineItem) => {
      if (lineItem.productId === productId) lineItem.quantity = quantity;
      return lineItem;
    });
    setUserCart(newCart);
  };
  const handleCheckout = async () => {
    await closeCart(userCart.id);
    await createCart(currentUser);
    const newCart = await getUserCart(currentUser);
    setUserCart(newCart);
  };
  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor={"right"}
        open={openCart}
        onClose={handleClose}
        width={"100px"}
      >
        {currentUser ? (
          <>
            <h1 className={classes.cartTitle}>Cart</h1>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>

                    <TableCell align="right">Price Per Unit</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((p) => {
                    const product = products.find(
                      (product) => product.id === p.productId
                    );
                    console.log(product.imgSrc);
                    return (
                      <TableRow key={product.name}>
                        <TableCell>
                          <img className={classes.image} src={product.imgSrc} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.name}
                          <Button onClick={() => handleDelete(product.id)}>
                            ❌
                          </Button>
                        </TableCell>
                        <TableCell align="right">${product.price}</TableCell>
                        <TableCell value={p.quantity} align="right">
                          <Button
                            onClick={() =>
                              handleQtyChange(p.quantity - 1, product.id)
                            }
                          >
                            ➖
                          </Button>
                          {p.quantity}
                          <Button
                            onClick={() =>
                              handleQtyChange(p.quantity + 1, product.id)
                            }
                          >
                            ➕
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          {ccyFormat(
                            priceRow(p.quantity, parseFloat(product.price))
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={3} />
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceSubtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTaxes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">
                      {ccyFormat(invoiceTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleCheckout} variant="outlined">
              Check Out
            </Button>
          </>
        ) : (
          <div className={classes.cartLogin}>
            <h1 className={classes.header}>
              Please Sign in or Register to add items to your cart.
            </h1>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Cart;
