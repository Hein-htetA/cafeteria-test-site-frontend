import React from "react";
import { useNavigate } from "react-router-dom";

const LinkToLogin = ({ disabled }) => {
  const navigate = useNavigate();
  const directToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="link-to-login-container">
      <div className="link-to-login-text">Already have an account?</div>
      <button
        className="link-to-login-btn"
        onClick={directToLogin}
        disabled={disabled}
      >
        Login
      </button>
    </div>
  );
};

export default LinkToLogin;
