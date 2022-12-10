import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const directRegister = () => {
    console.log("direct register");
    navigate("/register");
  };
  return (
    <div className="login-container">
      <h2 className="welcome-text">Welcome</h2>
      <div className="phone-number-input">
        <span>+95</span>
        <input type="number" placeholder="9xxxxxxxxx" />
      </div>
      <div className="password-input">
        <input type="password" placeholder="PASSWORD" />
        <span>
          <FontAwesomeIcon icon={faEye} />
        </span>
      </div>
      <div className="login-error-msg">wrong password or phone number</div>
      <button className="login-bottom">Login</button>
      <div className="dont-have-account">
        <p>Don't have an account?</p>
        <button onClick={directRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;
