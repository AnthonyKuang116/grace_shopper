import React, { useState } from "react";
import {register} from "../api"


const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const SignUp = ({ setCurrentUser, setShowAuth, setShowLogIn }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const usernameChangeHandler = (event) => {
    event.preventDefault();
    setUsernameInput(event.target.value);
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPasswordInput(event.target.value);
  };

  const handleClick = () => {
    setShowLogIn(true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await register(usernameInput, passwordInput, emailInput);
      if (!user.token) {
        alert(user.message);
        setPasswordInput("");

        return;
      }
      setToken(user.token);
      setCurrentUser(user.user);
      setShowAuth(false)
    } catch (error) {
      console.error(error);
    }
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
          <input
            type="text"
            className="email"
            placeholder="Email Address"
            value={emailInput}
            onChange={emailChangeHandler}
            required
          />
          <button className="auth_button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
      <div id="toggle_link">
        Already have an account?
        <span onClick={handleClick}> Log In</span>
      </div>
    </>
  );
};

export default SignUp;
