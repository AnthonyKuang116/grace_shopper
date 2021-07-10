import React from "react";
import { Drawer, List, ListItem } from "@material-ui/core";

const Cart = ({ products, userCart, openCart, setOpenCart }) => {
  const handleClose = () => {
    setOpenCart(false);
  };

  return (
    <div onClick={handleClose}>
      <Drawer
        anchor={"right"}
        open={openCart}
        onClose={handleClose}
        width={"100px"}
      >
        <List>
          {userCart ? (
            userCart.products.map((p) => {
              const product = products.find(
                (product) => product.id === p.productId
              );
              return (
                <ListItem key={p.id}>
                  {product.name} - {product.price} - {p.quantity}
                </ListItem>
              );
            })
          ) : (
            <ListItem>No Items</ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Cart;
