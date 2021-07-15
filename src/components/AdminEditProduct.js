import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import { deleteProduct, getAllProducts } from "../api"

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
    }
}));

const AdminEditProduct = ({ setEditProduct, editProduct, products, setProducts, setEditModal, rowData, setRowData }) => {
    const classes = useStyles();

    const [select, setSelection] = useState(0);

    let columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Product Name', width: 300 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'subCategory', headerName: 'Sub-Category', width: 200 },
        { field: 'description', headerName: 'Description', width: 350 },
        { field: 'price', headerName: 'Price', width: 120 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'imgSrc', headerName: 'Image URL Pathway', width: 250 },
        { field: 'edit', headerName: 'Edit', width: 105, renderCell: () => (<Button variant="contained" color="primary" onClick={editRow} style={{ marginRight: "30px" }}>Edit</Button>) },
        { field: 'delete', headerName: 'Delete', width: 120, renderCell: () => (<Button variant="contained" color="secondary" onClick={deleteSelectedProduct}>Delete</Button>) }
    ]

    const handleClose = () => {
        setEditProduct(false);
    };

    const deleteSelectedProduct = (e) => {
        // console.log("delete product", select.id)


        const newProductList = [...products].filter(
            (product) => product.id != select.id
        )

        deleteProduct(select.id)

        setProducts(newProductList)
    }

    const editRow = (e) => {
        // console.log("Edit Button is work")
        setRowData(select)
        setEditModal(true);
    }

    useEffect(() => {
        // setRowData(select)
        // console.log(rowData)

        setRowData((oldRowData) => {
            // console.log(select)       
            return select;
        })
    }, [select])

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
                    <div className={classes.paper} style={{ height: 650, width: '100%' }}>
                        <DataGrid
                            className={classes.root}
                            rows={products}
                            columns={columns}
                            pageSize={10}
                            onRowSelected={(row) => setSelection(row.data)}
                        // onRowSelected = {(row) => setRowData(row.data)}
                        // onRowSelected={(row) => setSelection(row.api.current.getSelectedRows())}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default AdminEditProduct;