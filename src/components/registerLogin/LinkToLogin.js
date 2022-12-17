import React from "react";
import { useNavigate } from "react-router-dom";

const LinkToLogin = () => {
  const navigate = useNavigate();
  const directToLogin = () => {
    navigate("/");
  };
  return (
    <div className="link-to-login-container">
      <div className="link-to-login-text">Already have an account?</div>
      <button className="link-to-login-btn" onClick={directToLogin}>
        Login
      </button>
    </div>
  );
};

export default LinkToLogin;
