import React, { useState } from "react";
import "./Register.css";
import { validate } from "./validateFun";
import Resizer from "react-image-file-resizer";
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
import LinkToLogin from "./LinkToLogin";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/userSlice";

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
  const error = useSelector((state) => state.user.error);
  const registerStatus = useSelector((state) => state.user.status);

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

  const [hidePassword, setHidePassword] = useState({
    passwordHide: true,
    confirmPasswordHide: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    try {
      await dispatch(registerUser(formValues)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
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
        disabled={registerStatus === "loading"}
        isOwner={true}
      />
      <RegisterInfoContainer>
        <Name
          name={formValues.name}
          onChangeInput={onChangeInput}
          nameError={formErrors.nameError}
          disabled={registerStatus === "loading"}
        />

        <hr />
        <Phone
          phone={formValues.phone}
          onChangeInput={onChangeInput}
          phoneError={
            formErrors.phoneError || (error.serverError && "Unavailable")
          } //error is reply from server
          disabled={registerStatus === "loading"}
        />

        <hr />
        <Password
          password={formValues.password}
          passwordError={formErrors.passwordError}
          togglePassword={togglePassword}
          passwordHide={hidePassword.passwordHide}
          onChangeInput={onChangeInput}
          disabled={registerStatus === "loading"}
        />

        <hr />
        <ConfirmPassword
          confirmPassword={formValues.confirmPassword}
          confirmPasswordError={formErrors.confirmPasswordError}
          toggleConfirmPassword={toggleConfirmPassword}
          confirmPasswordHide={hidePassword.confirmPasswordHide}
          onChangeInput={onChangeInput}
          disabled={registerStatus === "loading"}
        />

        <hr />
        <Address
          onChangeInput={onChangeInput}
          address={formValues.address}
          disabled={registerStatus === "loading"}
        />
        <hr />
        <Email
          onChangeInput={onChangeInput}
          email={formValues.email}
          disabled={registerStatus === "loading"}
        />
        <hr />
        <ExtraPhone
          onChangeInput={onChangeInput}
          extraPhone={formValues.extraPhone}
          disabled={registerStatus === "loading"}
        />
        <hr />
        <RegisterWarning />
      </RegisterInfoContainer>
      <RegisterBtn handleRegister={handleRegister} />
      <LinkToLogin disabled={registerStatus === "loading"} />
    </RegisterContainer>
  );
};

export default Register;
