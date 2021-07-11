import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  TextField,
} from "@material-ui/core";
addProductToCart;
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addProductToCart } from "../api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
  },
}));

const Product = ({
  currentUser,
  modalProduct,
  openProduct,
  setOpenProduct,
  userCart,
  setUserCart,
}) => {
  if (!modalProduct) return <div></div>;
  const classes = useStyles();
  const descriptionArr = modalProduct.description.split("  ");
  console.log(userCart);
  const handleClose = () => {
    setOpenProduct(false);
  };
  const [quantity, setQuantity] = useState(1);
  const qChange = (evt) => setQuantity(evt.target.value);
  const addToCart = async () => {
    const data = await addProductToCart(
      modalProduct.id,
      quantity,
      currentUser,
      modalProduct.price
    );
    console.log(userCart);
    const newProducts = [...userCart.products, data];
    const newCart = Object.assign({}, userCart);
    newCart.products = newProducts;
    setUserCart(newCart);
    setOpenProduct(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={openProduct}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProduct}>
          <div className={classes.paper}>
            <header
              style={{
                backgroundImage: `url(${modalProduct.imgSrc})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "150px",
              }}
            ></header>
            <h2>{modalProduct.name}</h2>

            {descriptionArr.map((description) => (
              <p key={description}>✅{description}</p>
            ))}

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
                onClick={() => addToCart()}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={modalProduct.quantity + " available."}
              TransitionComponent={Zoom}
              enterDelay={750}
              enterNextDelay={750}
              leaveDelay={200}
              placement="right-end"
            >
              <TextField
                className={classes.quantity}
                id="standard-number"
                label="Quantity"
                type="number"
                defaultValue="1"
                onChange={qChange}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
              />
            </Tooltip>
            <Typography variant="h4">${modalProduct.price}</Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Product;
