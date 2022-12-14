import React, { useState } from "react";
import "./Register.css";
import { validate } from "./validateFun";
import Resizer from "react-image-file-resizer";
import { localBaseUrl } from "../utils/baseUrl";
import { useUiContext } from "../../Context/UiContext";
import RegisterBtn from "./RegisterBtn";
import RegisterWarning from "./RegisterWarning";
import RegisterContainer from "./RegisterContainer";
import RegisterTitle from "./RegisterTitle";
import ProfilePhoto from "./ProfilePhoto";
import RegisterInfoContainer from "./RegisterInfoContainer";
import Name from "./Name";
import Phone from "./Phone";
import Password from "./Password";
import ConfirmPassword from "./ConfirmPassword";
import Address from "./Address";
import Email from "./Email";
import ExtraPhone from "./ExtraPhone";
import { useNavigate } from "react-router-dom";

const resizeProfile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      95,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    email: "",
    extraPhone: "",
    profileImage: "",
    profilePhotoUrl: "",
    profilePhotoId: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [registerStatus, setRegisterStatus] = useState({
    registerSuccess: false,
    registerError: false,
    registerLoading: false,
    errorMsg: "",
  });

  const [hidePassword, setHidePassword] = useState({
    passwordHide: true,
    confirmPasswordHide: true,
  });

  const { setLoggedIn, setUser } = useUiContext();
  const navigate = useNavigate();

  const togglePassword = () => {
    setHidePassword((state) => ({
      ...state,
      passwordHide: !state.passwordHide,
    }));
  };

  const toggleConfirmPassword = () => {
    setHidePassword((state) => ({
      ...state,
      confirmPasswordHide: !state.confirmPasswordHide,
    }));
  };

  const onChangeProfile = async (e) => {
    const inputImage = e.target.files[0];
    if (inputImage.size > 6144000) {
      setFormErrors({ ...formErrors, profilePhoto: true });
      return;
    }
    try {
      const image = await resizeProfile(e.target.files[0]);
      setFormValues({ ...formValues, profileImage: image });
      setFormErrors({ ...formErrors, profilePhoto: false });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setFormErrors({});
  };

  const removeProfile = () => {
    setFormValues({ ...formValues, profileImage: "" });
  };

  const handleRegister = async () => {
    const error = validate(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;
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
      setRegisterStatus({
        ...registerStatus,
        registerLoading: true,
        registerError: false,
      });
      const response = await fetch(
        `${localBaseUrl}/auth/register`,
        requestOptions
      );
      console.log(response);
      if (!response.ok) {
        if (response.status === 400) {
          // console.log("did i ran");
          const { msg } = await response.json();
          console.log(msg);
          // const data = await response.json();
          // console.log(data);
          setRegisterStatus({
            ...registerStatus,
            registerLoading: false,
            registerError: true,
            errorMsg: msg,
          });
          setFormErrors({ ...formErrors, phoneError: "Unavailable" });
          return;
        } else {
        }
        throw new Error("something went wrong!");
      }
      const { user } = await response.json();
      setRegisterStatus({
        ...registerStatus,
        registerLoading: false,
        registerError: false,
        registerSuccess: true,
      });
      setLoggedIn();
      setUser(user);
      navigate("/profile", {
        replace: true,
      });
    } catch (error) {
      setRegisterStatus({
        ...registerStatus,
        registerLoading: false,
        registerError: true,
        errorMsg: "Something went wrong!",
      });
    }
  };

  return (
    <RegisterContainer>
      <RegisterTitle />
      <ProfilePhoto
        profilePhotoUrl={formValues.profilePhotoUrl}
        profilePhoto={formErrors.profilePhoto}
        onChangeProfile={onChangeProfile}
        removeProfile={removeProfile}
        profileImage={formValues.profileImage}
      />
      <RegisterInfoContainer>
        <Name
          name={formValues.name}
          onChangeInput={onChangeInput}
          nameError={formErrors.nameError}
        />

        <hr />
        <Phone
          phone={formValues.phone}
          onChangeInput={onChangeInput}
          phoneError={formErrors.phoneError}
        />

        <hr />
        <Password
          password={formValues.password}
          passwordError={formErrors.passwordError}
          togglePassword={togglePassword}
          passwordHide={hidePassword.passwordHide}
          onChangeInput={onChangeInput}
        />

        <hr />
        <ConfirmPassword
          confirmPassword={formValues.confirmPassword}
          confirmPasswordError={formErrors.confirmPasswordError}
          toggleConfirmPassword={toggleConfirmPassword}
          confirmPasswordHide={hidePassword.confirmPasswordHide}
          onChangeInput={onChangeInput}
        />

        <hr />
        <Address onChangeInput={onChangeInput} address={formValues.address} />
        <hr />
        <Email onChangeInput={onChangeInput} email={formValues.email} />
        <hr />
        <ExtraPhone
          onChangeInput={onChangeInput}
          extraPhone={formValues.extraPhone}
        />
        <hr />
        {/* <div className="register-form-row">
          <label>ID</label>
          <div>:</div>
          <div>
            <div>
              <label htmlFor="idInput" className="profile-image-icon">
                <div className="upload-id-btn">Upload ID</div>
                <input
                  id="idInput"
                  type="file"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  onChange={onChangeIdPhoto}
                  multiple
                />
              </label>
              <div className="id-photo-warning">
                Maximun Number of Photos Allowed - <span>6</span> <br />
                Maximun Image Size - <span>6 MB</span> <br />
                Recommanded Ratio - <span>1 : 1</span> <br />
                <span>*** Required for verification purpose ***</span>
              </div>
            </div>
          </div>
        </div>
        {formErrors.idPhoto ? (
          <div className="id-image-error-message">
            <div className="id-image-error-message-first">
              Cannot add image larger than
            </div>
            <div className="id-image-error-message-second">* 6MB *</div>
          </div>
        ) : (
          <div className="id-photo-container">
            <img src={profilePhoto} alt="Id-Card" className="id-photo" />
            <img src={profilePhoto} alt="Id-Card" className="id-photo" />
            <img src={profilePhoto} alt="Id-Card" className="id-photo" />
            <img src={profilePhoto} alt="Id-Card" className="id-photo" />
            <img src={profilePhoto} alt="Id-Card" className="id-photo" />
          </div>
        )} */}
        <RegisterWarning
          registerError={registerStatus.registerError}
          errorMsg={registerStatus.errorMsg}
        />
      </RegisterInfoContainer>
      <RegisterBtn
        handleRegister={handleRegister}
        registerLoading={registerStatus.registerLoading}
        registerError={registerStatus.registerError}
      />
    </RegisterContainer>
  );
};

export default Register;
