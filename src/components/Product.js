import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

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
            <h2>{modalProduct.name}</h2>
            {descriptionArr.map((description) => (
              <p>✅{description}</p>
            ))}
            <Button variant="outlined" color="primary">
              Add to cart
            </Button>
            <Typography variant="h4">${modalProduct.price}</Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Product;
