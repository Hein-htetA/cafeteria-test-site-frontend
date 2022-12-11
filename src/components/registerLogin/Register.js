import React, { useState } from "react";
import "./Register.css";
import profile from "../../img/profile-photo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye } from "@fortawesome/free-solid-svg-icons";
import { onBlurValidate, confirmPasswordValidate } from "./validateFun";

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    email: "",
    extraPhone: "",
  });

  const [formValuesFocused, setFormValuesFocused] = useState({
    name: false,
    phone: false,
    password: false,
    confirmPassword: false,
    address: false,
    email: false,
    extraPhone: false,
  });
  const [formErrors, setFormErrors] = useState({ name: "" });

  const onChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    const error = onBlurValidate(formValues);
    setFormErrors(error);
  };

  const handleOnBlur = (e) => {
    const error = onBlurValidate(formValues);
    setFormValuesFocused({
      ...formValuesFocused,
      [e.target.name]: true,
    });
    setFormErrors({ ...formErrors, ...error });
  };

  const confirmPasswordOnBlur = (e) => {
    const error = confirmPasswordValidate(formValues);
    setFormValuesFocused({
      ...formValuesFocused,
      [e.target.name]: true,
    });
    setFormErrors({ ...formErrors, ...error });
  };

  return (
    <div className="register-container">
      {/* <h4>{JSON.stringify(formErrors)}</h4>
      <h2>{JSON.stringify(formValuesFocused)}</h2> */}
      <h3 className="register-title">Register New Account</h3>
      <img src="" alt="profile" className="profile-photo" />
      <label htmlFor="inputTag" className="profile-image-icon">
        <div className="upload-profile-btn">Upload Profile</div>
        <input
          id="inputTag"
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          style={{ display: "none" }}
        />
      </label>
      <div className="register-info-container">
        <div className="register-form-row">
          <label>
            Name<span>{" * "}</span>
          </label>
          <div>:</div>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formValues.name}
              onChange={onChangeInput}
              onBlur={handleOnBlur}
              className={
                formErrors.name && formValuesFocused.name
                  ? "register-form-error"
                  : "register-name-input"
              }
            />
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>
            Phone <span>{" * "}</span>
          </label>
          <div>:</div>
          <div className="phone-number-container">
            <div
              className={
                formErrors.phone && formValuesFocused.phone
                  ? "phone-number-prefix register-form-error"
                  : "phone-number-prefix"
              }
            >
              <input
                type={"number"}
                readOnly
                placeholder="+95"
                className="phone-number-input1"
                style={{ width: "35px" }}
              />
              <input
                type="number"
                placeholder="9xxxxxxxxx"
                className={"phone-number-input"}
                name="phone"
                value={formValues.phone}
                onChange={onChangeInput}
                onBlur={handleOnBlur}
              />
              <span
                className={
                  formValuesFocused.phone
                    ? "register-err-msg"
                    : "register-err-msg-hide"
                }
              >
                {formErrors.phoneMsg}
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>
            Password <span>{" * "}</span>
          </label>
          <div>:</div>
          <div>
            <div
              className={
                formErrors.password && formValuesFocused.password
                  ? "password-container register-form-error"
                  : "password-container"
              }
            >
              <input
                type="text"
                placeholder="Password"
                className={"password-input-register"}
                name="password"
                value={formValues.password}
                onChange={onChangeInput}
                onBlur={handleOnBlur}
              />
              <span
                className={
                  formValuesFocused.password
                    ? "register-err-msg"
                    : "register-err-msg-hide"
                }
              >
                {formErrors.passwordMsg}
              </span>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "10px" }} />
            </div>
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>
            Confirm <span>{" * "}</span>Password
          </label>
          <div>:</div>
          <div
            className={
              formErrors.confirmPassword && formValuesFocused.confirmPassword
                ? "password-container register-form-error"
                : "password-container"
            }
          >
            <input
              type="text"
              placeholder="Confirm Pass."
              className={"password-input-register"}
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={onChangeInput}
              onBlur={confirmPasswordOnBlur}
            />
            <span
              className={
                formValuesFocused.confirmPassword
                  ? "register-err-msg"
                  : "register-err-msg-hide"
              }
            >
              {formErrors.confirmPasswordMsg}
            </span>
            <FontAwesomeIcon icon={faEye} style={{ marginRight: "10px" }} />
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>Address</label>
          <div>:</div>
          <div>
            <textarea
              placeholder="Address"
              name="address"
              value={formValues.address}
              onChange={onChangeInput}
            ></textarea>
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>Email</label>
          <div>:</div>
          <div>
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              value={formValues.email}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>Extra Ph.</label>
          <div>:</div>
          <div className="phone-number-prefix">
            <input
              type={"number"}
              readOnly
              placeholder="+95"
              className="phone-number-input1"
              style={{ width: "35px" }}
            />
            <input
              type="number"
              placeholder="9xxxxxxxxx"
              className="phone-number-input"
              name="extraPhone"
              value={formValues.extraPhone}
              onChange={onChangeInput}
            />
            <span className="register-err-msg"></span>
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>ID</label>
          <div>:</div>
          <div>
            <label htmlFor="inputTag" className="profile-image-icon">
              <div className="upload-id-btn">Upload ID</div>
              <input
                id="inputTag"
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                style={{ display: "none" }}
              />
            </label>
            <div className="id-photo-container">
              <img src="" alt="Id-Card" className="id-photo" />
            </div>
          </div>
        </div>

        <div className="warning-text">
          <span>*</span> fields are required
        </div>
      </div>
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
