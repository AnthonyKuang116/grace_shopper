import React, { useState } from "react";
import { LogIn, SignUp } from "./index";
import "../css/style.css";

export const Auth = ({ setUser }) => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="auth_page">
      <div className="body">
        {showSignUp ? (
          <SignUp setUser={setUser} setShowSignUp={setShowSignUp} />
        ) : (
          <LogIn setUser={setUser} setShowSignUp={setShowSignUp} />
        )}
      </div>
    </div>
  );
};

export default Auth;
