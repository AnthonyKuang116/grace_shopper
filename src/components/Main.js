import React from "react";
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
} from "@material-ui/core";

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
    width: 200,
  },
  card: {
    paddingTop: "0px",
  },
  quantity: {
    fontSize: "10px",
    width: "4em",
  },
});

const Main = ({ products, setModalProduct, setOpenProduct }) => {
  const classes = useStyles();
  const handleOpen = (product) => {
    setModalProduct(product);
    setOpenProduct(true);
  };

  const addToCart = (product, quantity) => {};
  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className={classes.root}>
          <CardMedia
            className={classes.media}
            title={product.name}
            image={product.imgSrc}
            onClick={() => handleOpen(product)}
          />
          <CardContent className={classes.card}>
            <Typography component="h2">${product.price}</Typography>
            <Typography variant="body1" component="h3">
              {product.name}
            </Typography>
            <CardActions>
              <IconButton
                edge="start"
                aria-label="add item to cart"
                aria-haspopup="true"
                color="inherit"
              >
                <AddShoppingCartIcon />
              </IconButton>
              <TextField
                className={classes.quantity}
                id="standard-number"
                label="Quantity"
                type="number"
                defaultValue="1"
                InputProps={{ inputProps: { min: 0, max: 10 } }}
              />
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default Main;
