import React, { useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import Address from "../registerLogin/Address";
import Email from "../registerLogin/Email";
import ExtraPhone from "../registerLogin/ExtraPhone";
import Name from "../registerLogin/Name";
import Phone from "../registerLogin/Phone";
import ProfilePhoto from "../registerLogin/ProfilePhoto";
import RegisterContainer from "../registerLogin/RegisterContainer";
import RegisterInfoContainer from "../registerLogin/RegisterInfoContainer";
import Resizer from "react-image-file-resizer";
import { validate } from "./validate";
import { localBaseUrl } from "../utils/baseUrl";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import ProfileTitle from "./ProfileTitle";
import { useNavigate } from "react-router-dom";
import ProfileBtnGroup from "./ProfileBtnGroup";

const resizeProfile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      750,
      "JPEG",
      95,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const Profile = () => {
  const { user, setUser, setLoggedIn } = useUserContext();
  const [formValues, setFormValues] = useState({ ...user, profileImage: "" });
  const [formErrors, setFormErrors] = useState({});
  const [updateStatus, setUpdateStatus] = useState({
    updateSuccess: false,
    updateError: false,
    updateLoading: false,
  });

  const navigate = useNavigate();

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
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
    });
    setFormErrors({});
  };

  const removeProfile = () => {
    setFormValues({ ...formValues, profilePhotoUrl: "", profileImage: "" });
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
    });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedIn();
    navigate("/");
  };

  const updateUser = async () => {
    const error = validate(formValues);
    setFormErrors({ ...formErrors, ...error });

    if (Object.keys(error).length !== 0) return;
    const requestOptions = {
      method: "PATCH",
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
      setUpdateStatus({
        ...updateStatus,
        updateLoading: true,
        updateError: false,
      });
      const response = await fetch(`${localBaseUrl}/users`, requestOptions);
      if (!response.ok) {
        if (response.status === 400) {
          const { msg } = await response.json();
          setUpdateStatus({
            ...updateStatus,
            updateLoading: false,
            updateError: true,
          });
          setFormErrors({
            ...formErrors,
            phoneError: "Unavailable",
            errorMsg: msg,
          });
          return;
        }
        throw new Error("something went wrong!");
      }
      const data = await response.json();
      const { updatedUser } = data;
      // Update request succeessful
      setUpdateStatus({
        ...updateStatus,
        updateLoading: false,
        updateError: false,
        updateSuccess: true,
      });
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setFormValues({ ...updatedUser, profileImage: "" });
    } catch (error) {
      setUpdateStatus({
        ...updateStatus,
        updateLoading: false,
        updateError: true,
      });
      setFormErrors({ ...formErrors, errorMsg: "Something went wrong!" });
    }
  };

  return (
    <RegisterContainer>
      <ProfileTitle />
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
        <Phone
          phone={formValues.phone}
          onChangeInput={onChangeInput}
          phoneError={formErrors.phoneError}
        />
        <Address onChangeInput={onChangeInput} address={formValues.address} />
        <Email onChangeInput={onChangeInput} email={formValues.email} />
        <ExtraPhone
          onChangeInput={onChangeInput}
          extraPhone={formValues.extraPhone}
        />
      </RegisterInfoContainer>
      <ProfileBtnGroup
        errorMsg={formErrors.errorMsg}
        logOut={logOut}
        updateUser={updateUser}
        updateStatus={updateStatus}
      />
    </RegisterContainer>
  );
};

export default Profile;
