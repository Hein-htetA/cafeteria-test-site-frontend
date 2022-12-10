import React from "react";
import "./Register.css";
import profile from "../../img/profile-photo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  return (
    <div className="register-container">
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
            <input type="text" placeholder="Name" />
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>
            Phone<span>{" * "}</span> Number
          </label>
          <div>:</div>
          <div className="phone-number-container">
            <div className="phone-number-prefix">
              <input
                type={"number"}
                readOnly
                placeholder="+95"
                className="phone-number-input"
                style={{ width: "35px" }}
              />
              <input
                type="number"
                placeholder="9xxxxxxxxx"
                className="phone-number-input"
              />
            </div>
            <div className="phone-number-prefix">
              <input
                type={"number"}
                readOnly
                placeholder="+95"
                className="phone-number-input"
                style={{ width: "35px" }}
              />
              <input
                type="number"
                placeholder="9xxxxxxxxx"
                className="phone-number-input"
              />
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
            <div className="password-container">
              <input type="text" placeholder="Password" />
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
          <div className="password-container">
            <input type="text" placeholder="Confirm Password" />
            <FontAwesomeIcon icon={faEye} style={{ marginRight: "10px" }} />
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>Address</label>
          <div>:</div>
          <div>
            <input type="text" placeholder="Address" />
          </div>
        </div>
        <hr />
        <div className="register-form-row">
          <label>Email</label>
          <div>:</div>
          <div>
            <input type="email" placeholder="example@gmail.com" />
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
      <button className="register-btn">Register</button>
    </div>
  );
};

export default Register;
