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

const Auth = ({ setUser, showSignUp, setShowSignUp }) => {
  const classes = useStyles()
const handleClose = () => {setShowSignUp(false)};
console.log(showSignUp)

  return (
    <div>
      <Modal
         className={classes.modal}
        open={showSignUp}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        
          <div className={classes.paper}>
            {showSignUp ? (
              <SignUp setUser={setUser} setShowSignUp={setShowSignUp} />
            ) : (
              <LogIn setUser={setUser} setShowSignUp={setShowSignUp} />
            )}
          </div>
        
      </Modal>
    </div>
  );
};

export default Auth; 
