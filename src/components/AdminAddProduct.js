import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';

import { createProduct } from "../api"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
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

const AdminAddProduct = ({ addProduct, setAddProduct, products, setProducts }) => {
    const classes = useStyles();

    //states used for product
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [imgSrc, setImgSrc] = useState("");

    //handles closing modal
    const handleClose = () => {
        setAddProduct(false);
    };

    //handles setting values for product being added
    const handleName = (e) => { setName(e.target.value) }
    const handleCategory = (e) => { setCategory(e.target.value) }
    const handleSubCategory = (e) => { setSubCategory(e.target.value) }
    const handleDescription = (e) => { setDescription(e.target.value) }
    const handlePrice = (e) => { setPrice(e.target.value) }
    const handleQuantity = (e) => { setQuantity(e.target.value) }
    const handleImage = (e) => { setImgSrc(e.target.value) }

    //handles submitting the form
    const handleSubmit = async (e) => {
        try {
            const newProduct = await createProduct({ category, subCategory, name, description, price, quantity, imgSrc })
            const newProductList = [...products, newProduct]
            console.log("new product list", newProductList)
            setProducts(newProductList)
            setAddProduct(false)
            console.log("new product", newProduct)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Modal
                className={classes.modal}
                open={addProduct}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addProduct}>
                    <div className={classes.paper} style={{ height: 500, width: 300 }}>
                        <form className={classes.root} noValidate autoComplete="off"
                            style={{ height: 500, width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h2 style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>Create Product</h2>
                            <TextField id="addProductName" label="Name of Product" onChange={handleName} />
                            <TextField id="addProductCat" label="Category" onChange={handleCategory} />
                            <TextField id="addProductSub" label="Sub-Category" onChange={handleSubCategory} />
                            <TextField id="addProductDesc" label="Description" onChange={handleDescription} />
                            <TextField id="addProductPrice" label="Price" onChange={handlePrice} />
                            <TextField id="addProductQuant" label="Quantity" onChange={handleQuantity} />
                            <TextField id="addProductImg" label="Image URL" onChange={handleImage} />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Create Product</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>

        </div>
    )
}

export default AdminAddProduct;