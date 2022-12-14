import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { localBaseUrl } from "../utils/baseUrl";
import { useUiContext } from "../../Context/UiContext";

const Login = () => {
  const [formValues, setFormValues] = useState({ phone: "", password: "" });
  const [passwordHide, setPasswordHide] = useState(true);
  const [loginStatus, setLoginStatus] = useState({
    loginLoading: false,
    loginError: false,
  });
  const navigate = useNavigate();
  const { setUser, setLoggedIn } = useUiContext();

  const onChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setLoginStatus({});
  };

  const togglePassword = () => {
    setPasswordHide((passwordHide) => !passwordHide);
  };

  const directRegister = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formValues,
        phone:
          formValues.phone[0] === "0"
            ? formValues.phone.slice(1)
            : formValues.phone.slice(0),
      }),
    };

    try {
      setLoginStatus({
        ...loginStatus,
        loginLoading: true,
        loginError: false,
      });
      const response = await fetch(
        `${localBaseUrl}/auth/login`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { user } = await response.json();
      setLoginStatus({
        ...loginStatus,
        loginLoading: false,
        loginError: false,
      });
      setLoggedIn();
      setUser(user);
      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      setLoginStatus({
        ...loginStatus,
        loginLoading: false,
        loginError: true,
      });
    }
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
            loginStatus.loginError
              ? "login-phone-input login-error"
              : "login-phone-input"
          }
          name="phone"
          value={formValues.phone}
          onChange={onChangeInput}
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
        {loginStatus.loginError ? "wrong password oR phone number" : ""}
      </div>
      <button className="login-bottom" onClick={handleLogin}>
        {loginStatus.loginLoading ? "Logging In" : "Login"}
      </button>
      <div className="dont-have-account">
        <p>Don't have an account?</p>
        <button onClick={directRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;
