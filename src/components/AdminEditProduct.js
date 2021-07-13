import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { getAllProducts } from '../api/index';

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

const AdminEditProduct = ({ setEditProduct, editProduct, products, setProducts }) => {
    let columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Product Name', width: 300 },
        { field: 'category', headerName: 'Category', width: 600 },
        { field: 'subCategory', headerName: 'Sub-Category', width: 300 },
        { field: 'description', headerName: 'Description', width: 120 },
        { field: 'price', headerName: 'Price', width: 120 },
        { field: 'quantity', headerName: 'Quantity', width: 120 },
        { field: 'imgSrc', headerName: 'Image URL Pathway', width: 120 }
    ]

    const classes = useStyles();

    const [rows, setRows] = useState([])
    const handleClose = () => {
        setEditProduct(false);
    };

    // useEffect(() => {
    //     getAllProducts()
    //         .then((product) => setRows(product))
    //         .catch(console.error);
    // }, [])

    return (
        <div>
            <Modal
                className={classes.modal}
                open={editProduct}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editProduct}>
                    <div className={classes.paper} style={{ height: 500, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={10} />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AdminEditProduct;