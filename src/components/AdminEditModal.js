import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';

import { updateProduct } from "../api"

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

const AdminEditModal = ({editModal, setEditModal, rowData, setRowData, products, setProducts}) => {
    const classes = useStyles();

    //states used for product
    const [name, setName] = useState(rowData.name);
    const [category, setCategory] = useState(rowData.category);
    const [subCategory, setSubCategory] = useState(rowData.subCategory);
    const [description, setDescription] = useState(rowData.description);
    const [price, setPrice] = useState(rowData.price);
    const [quantity, setQuantity] = useState(rowData.quantity);
    const [imgSrc, setImgSrc] = useState(rowData.imgSrc);

    //handles closing modal
    const handleClose = () => {
        setEditModal(false);
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
            // const newProduct = await updateProduct(rowData.id, category, subCategory, name, description, price, quantity, imgSrc);
            // console.log("New edited product", newProduct)
            setEditModal(false);

            console.log(rowData)
            console.log("This should be the product name", rowData.name)
            console.log("Name state", name)
        } catch (error) {
            console.error(error)
        }
    }

    // useEffect(() => {
    //     console.log("Product name", name)
    // }, [name, category, subCategory, description, price, quantity, imgSrc])\


    return (
        <div>
            <Modal
                className={classes.modal}
                open={editModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editModal}>
                    <div className={classes.paper} style={{ height: 550, width: 300 }}>
                        <form className={classes.root} noValidate autoComplete="off"
                            style={{ height: 500, width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h2 style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>Edit Product</h2>
                            <TextField id="addProductName" label="Name" defaultValue={rowData.name} onChange={handleName} />
                            <TextField id="addProductCat" label="Category" defaultValue={rowData.category} onChange={handleCategory} />
                            <TextField id="addProductSub" label="Sub-Category" defaultValue={rowData.subCategory} onChange={handleSubCategory} />
                            <TextField id="addProductDesc" multiline rowsMax="4" label="Description (Double-Space for new bullet)" defaultValue={rowData.description} onChange={handleDescription} />
                            <TextField id="addProductPrice" label="Price" defaultValue={rowData.price} onChange={handlePrice} />
                            <TextField id="addProductQuant" label="Quantity" defaultValue={rowData.quantity} onChange={handleQuantity} />
                            <TextField id="addProductImg" label="Image Pathway" defaultValue={rowData.imgSrc} onChange={handleImage} />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Save Edits</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AdminEditModal;