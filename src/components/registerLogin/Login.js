import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

const Login = () => {
  const [formValues, setFormValues] = useState({ phone: "", password: "" });
  const [passwordHide, setPasswordHide] = useState(true);

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const status = useSelector((state) => state.user.status);
  if (isLoggedIn) {
    navigate("/myAccount/profile", {
      replace: true,
    });
  }

  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setPasswordHide((passwordHide) => !passwordHide);
  };

  const directRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2 className="welcome-text">Welcome</h2>
      <div className="phone-number-input">
        <span>+95</span>
        <input
          type="number"
          placeholder="9xxxxxxxxx"
          className={
            status === "failed"
              ? "login-phone-input login-error"
              : "login-phone-input"
          }
          name="phone"
          value={formValues.phone}
          onChange={onChangeInput}
          onKeyDown={(event) => {
            if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
              event.stopPropagation();
              event.preventDefault();
            }
          }}
        />
      </div>
      <div className="password-input">
        <input
          type={passwordHide ? "password" : "text"}
          placeholder="PASSWORD"
          name="password"
          value={formValues.password}
          onChange={onChangeInput}
        />
        <span>
          {passwordHide ? (
            <FontAwesomeIcon
              icon={faEye}
              onClick={togglePassword}
              style={{ width: "20px", opacity: 0.9 }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              onClick={togglePassword}
              style={{ width: "20px", opacity: 0.9 }}
            />
          )}
        </span>
      </div>
      <div className="login-error-msg">
        {status === "failed" ? "wrong password or phone number" : ""}
      </div>
      <button
        className="login-bottom"
        onClick={() => dispatch(loginUser(formValues))}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Logging In" : "Login"}
      </button>
      <div className="dont-have-account">
        <p>Don't have an account?</p>
        <button onClick={directRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;
