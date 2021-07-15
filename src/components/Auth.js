import React, { useState } from "react";
import { LogIn, SignUp } from "./index";
import "../css/style.css";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";

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

const Auth = ({ setCurrentUser, showAuth, setShowAuth, showLogIn, setShowLogIn, setIsAdmin }) => {
  const classes = useStyles()
const handleClose = () => {setShowAuth(false)};
console.log(showAuth)

  return (
    <div>
      <Modal
        className={classes.modal}
        open={showAuth}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        
          <div className={classes.paper}>
            {showLogIn ? (
              <LogIn {...{setCurrentUser, setShowAuth, setShowLogIn, setIsAdmin}} />
            ) : (
              <SignUp {...{setCurrentUser, setShowAuth, setShowLogIn}} />
            )}
          </div>
        
      </Modal>
    </div>
  );
};

export default Auth; 
