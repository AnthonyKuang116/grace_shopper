import React, { useState } from "react";

const registerUser = async (username, password) => {
  try {
    const response = await fetch(`api/users/register`, {
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
    console.log({ user });
    return user;
  } catch (error) {
    console.error(error);
  }
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const SignUp = ({ setUser, setShowSignUp }) => {
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
    setShowSignUp(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(usernameInput, passwordInput);
      if (!user.token) {
        alert(user.message);
        setPasswordInput("");
        setVerifyPasswordInput("");

        return;
      }
      setToken(user.token);
      setUser(user.user);
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
