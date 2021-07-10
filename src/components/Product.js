import React from "react";
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
import { Button } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

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

const Product = ({ modalProduct, openProduct, setOpenProduct }) => {
  if (!modalProduct) return <div></div>;
  const classes = useStyles();
  const descriptionArr = modalProduct.description.split("  ");

  const handleClose = () => {
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
              <p>✅{description}</p>
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
