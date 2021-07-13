import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  TextField,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card,
  IconButton,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { addProductToCart } from "../api";

const useStyles = makeStyles({
  root: {
    width: 240,
    height: 350,
    display: "inline-grid",
    boxShadow:
      "5px 5px 0px 0px #289FED, 10px 10px 0px 0px #5FB8FF, 15px 15px 0px 0px #A1D8FF, 20px 20px 0px 0px #CAE6FF, 25px 25px 0px 0px #E1EEFF, 5px 5px 15px 5px rgba(0,0,0,0)",
    margin: "8px",
  },
  media: {
    height: 200,
    margin: "10px",
    width: 220,
  },
  card: {
    paddingTop: "0px",
  },
  quantity: {
    fontSize: "10px",
    width: "8em",
  },
});

const Main = ({
  userCart,
  setUserCart,
  currentUser,
  products,
  setModalProduct,
  setOpenProduct,
  setOpenCart,
}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const handleOpen = (product) => {
    setModalProduct(product);
    setOpenProduct(true);
  };
  const qChange = (evt) => setQuantity(evt.target.value);

  const addToCart = async (product) => {
    if (!currentUser) {
      setOpenCart(true);
      return;
    }
    console.log("products", products);

    const data = await addProductToCart(
      product.id,
      quantity,
      currentUser,
      product.price
    );
    console.log("products", products);
    const newProducts = [...userCart.products, data];
    const newCart = Object.assign({}, userCart);
    newCart.products = newProducts;
    setUserCart(newCart);
    setOpenCart(true);
    setQuantity(1);
    console.log("products", products);
  };

  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className={classes.root}>
          <CardMedia
            className={classes.media}
            title="Click for more information."
            image={product.imgSrc}
            onClick={() => handleOpen(product)}
          />
          <CardContent className={classes.card}>
            <Typography component="h2">${product.price}</Typography>
            <Typography variant="body1" component="h3">
              {product.name}
            </Typography>
            <CardActions>
              <Tooltip
                title="Add To Cart."
                TransitionComponent={Zoom}
                enterDelay={750}
                enterNextDelay={750}
                leaveDelay={200}
              >
                <IconButton
                  edge="start"
                  aria-label="add item to cart"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => addToCart(product)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={product.quantity + " available."}
                TransitionComponent={Zoom}
                enterDelay={750}
                enterNextDelay={750}
                leaveDelay={200}
                placement="right-end"
              >
                <TextField
                  className={classes.quantity}
                  id={product.id + "q"}
                  label="Quantity"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  onChange={qChange}
                />
              </Tooltip>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default Main;
