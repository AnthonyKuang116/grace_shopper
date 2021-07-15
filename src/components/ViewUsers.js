import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {allUsers} from '../api/index';

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

const ViewUsers = ({setOpenUsers, openUsers}) => {
    let columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'username', headerName: 'Username', width: 300 },
        { field: 'password', headerName: 'Password', width: 600 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'admin', headerName: 'Admin', width: 120 }
    ]

    const classes = useStyles();
    
    const [users, setUsers] = useState([])
    const handleClose = () => {
        setOpenUsers(false);
    };

    useEffect (() => {
        allUsers()
        .then((users) => setUsers(users))
        .catch(console.error);
    }, [users])

    return (
        <div>
            <Modal
                className={classes.modal}
                open={openUsers}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openUsers}>
                    <div className={classes.paper} style={{height: 500, width: '100%'}}>
                        <DataGrid rows={users} columns={columns} pageSize={10}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ViewUsers;