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
} from "@material-ui/core";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  image: { maxWidth: "100px" },
  cartTitle: { fontFamily: "Roboto", color: "red" },
});

const Cart = ({ products, userCart, openCart, setOpenCart }) => {
  const TAX_RATE = 0.025;
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  function priceRow(qty, unit) {
    return qty * unit;
  }
  function subtotal(items) {
    console.log(items);
    return items
      .map(({ price, quantity }) => parseFloat(price) * quantity)
      .reduce((sum, i) => sum + i, 0);
  }
  if (!userCart.products) return;
  const rows = userCart.products;
  console.log(rows);
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleClose = () => {
    setOpenCart(false);
  };
  const classes = useStyles();

  return (
    <div onClick={handleClose}>
      <Drawer
        anchor={"right"}
        open={openCart}
        onClose={handleClose}
        width={"100px"}
      >
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
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((p) => {
                const product = products.find(
                  (product) => product.id === p.productId
                );
                return (
                  <TableRow key={product.name}>
                    <TableCell>
                      <img className={classes.image} src={product.imgSrc} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>

                    <TableCell align="right">${product.price}</TableCell>
                    <TableCell align="right">{p.quantity}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(
                        priceRow(p.quantity, parseFloat(product.price))
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={3}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Drawer>
    </div>
  );
};

export default Cart;
