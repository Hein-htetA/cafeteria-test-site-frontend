import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ConfirmPassword = (props) => {
  const {
    onChangeInput,
    confirmPasswordError,
    confirmPassword,
    confirmPasswordHide,
    toggleConfirmPassword,
  } = props;
  return (
    <div className="register-form-row">
      <label>
        Confirm <span>{" * "}</span>Password
      </label>
      <div>:</div>
      <div
        className={
          confirmPasswordError
            ? "password-container register-form-error"
            : "password-container"
        }
      >
        <input
          type={confirmPasswordHide ? "password" : "text"}
          placeholder="Password"
          className={"password-input-register"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeInput}
        />
        <span
          className={
            confirmPasswordError ? "register-err-msg" : "register-err-msg-hide"
          }
        >
          {confirmPasswordError}
        </span>
        {confirmPasswordHide ? (
          <FontAwesomeIcon
            icon={faEye}
            style={{ marginRight: "10px", width: "20px", opacity: 0.9 }}
            onClick={toggleConfirmPassword}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEyeSlash}
            style={{ marginRight: "10px", width: "20px", opacity: 0.9 }}
            onClick={toggleConfirmPassword}
          />
        )}
      </div>
    </div>
  );
};

export default ConfirmPassword;
