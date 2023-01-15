import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Password = (props) => {
  const {
    onChangeInput,
    passwordError,
    password,
    passwordHide,
    togglePassword,
    disabled,
  } = props;
  return (
    <div className="register-form-row">
      <label>
        Password <span>{" * "}</span> (3 - 10)
      </label>
      <div>:</div>
      <div>
        <div
          className={
            passwordError
              ? "password-container register-form-error"
              : "password-container"
          }
        >
          <input
            type={passwordHide ? "password" : "text"}
            placeholder="Password"
            className={"password-input-register"}
            name="password"
            value={password}
            onChange={onChangeInput}
            disabled={disabled}
          />
          <span className={"register-err-msg"}>{passwordError}</span>
          {passwordHide ? (
            <FontAwesomeIcon
              icon={faEye}
              style={{ marginRight: "10px", width: "20px", opacity: 0.9 }}
              onClick={togglePassword}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              style={{ marginRight: "10px", width: "20px", opacity: 0.9 }}
              onClick={togglePassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
