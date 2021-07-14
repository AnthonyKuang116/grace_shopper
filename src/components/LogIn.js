import React, { useState } from "react";

const logInUser = async (username, password) => {
  try {
    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const LogIn = ({ setUser, setShowSignUp }) => {
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

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const user = await logInUser(usernameInput, passwordInput);
      if (!user.token) {
        alert(user.message);
        setPasswordInput("");
        return;
      }
      setToken(user.token);
      setUser(user.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setShowSignUp(true);
  };

  return (
    <>
      <div className="auth_form">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="username"
            placeholder="username"
            value={usernameInput}
            onChange={usernameChangeHandler}
            required
          />
          <input
            type="password"
            className="password"
            placeholder="password"
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
