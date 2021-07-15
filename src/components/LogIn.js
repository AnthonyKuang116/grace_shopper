import React, { useState, useEffect } from "react";
import {login} from "../api";

const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const LogIn = ({ setCurrentUser, setShowAuth, setShowLogIn, setIsAdmin }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const usernameChangeHandler = (event) => {
    setUsernameInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    
    setPasswordInput(event.target.value);
    
  };
  useEffect(()=>console.log("pw", passwordInput), [passwordInput]);
  useEffect(()=>console.log("un", usernameInput), [usernameInput]);

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const user = await login(usernameInput, passwordInput);
      console.log("user", user)
      if (!user.token) {
        alert(user.message);
        setPasswordInput("");
        return;
      }
      console.log(usernameInput, passwordInput)
      console.log("THIS IS USER ID", user.user)
      console.log("this is user admin", user.userAdmin)
      setIsAdmin(user.userAdmin);
      setToken(user.token);
      setCurrentUser(user.user);
      setShowAuth(false)
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setShowLogIn(false);
  };

  return (
    <>
      <div className="auth_form">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="username"
            placeholder="Username"
            value={usernameInput}
            onChange={usernameChangeHandler}
            required
          />
          <input
            type="password"
            className="password"
            placeholder="Password"
            value={passwordInput}
            onChange={passwordChangeHandler}
            required
          />
          <button className="auth_button" onClick={handleLogIn}>
            Log In
          </button>
        </form>
      </div>
      <div id="toggle_link">
        <span onClick={handleClick}>Sign up for an account</span>
      </div>
    </>
  );
};

export default LogIn;
