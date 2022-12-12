import React, { useState } from "react";
import { useUiContext } from "../../Context/UiContext";
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
  const { user, setUser } = useUiContext();
  const [formValues, setFormValues] = useState({ ...user, profileImage: "" });
  const [formErrors, setFormErrors] = useState({});
  const [updateStatus, setUpdateStatus] = useState({
    updateSuccess: false,
    updateError: false,
    updateLoading: false,
  });

  // console.log("user", user);
  console.log("form values", formValues);

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
    setFormValues({ ...formValues, profilePhotoUrl: "", profileImage: "" });
  };

  const updateUser = async () => {
    const error = validate(formValues);
    setFormErrors({ ...formErrors, ...error });

    if (Object.keys(error).length !== 0) return;
    console.log("update server ran");
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formValues,
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
        if (response.status) {
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
      console.log("updated user", updatedUser);
      // Update request succeessful
      setUpdateStatus({
        ...updateStatus,
        updateLoading: false,
        updateError: false,
        updateSuccess: true,
      });
      setUser(updatedUser);
      setFormValues({ ...updatedUser, profileImage: "" });
    } catch (error) {
      setUpdateStatus({
        ...updateStatus,
        updateLoading: false,
        updateError: true,
      });
    }
  };

  return (
    <RegisterContainer>
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
      <div className="err-msg-profile-container">
        {formErrors.errorMsg && (
          <div className="profile-update-err-msg">{formErrors.errorMsg}</div>
        )}
        <button className="update-profile-btn" onClick={updateUser}>
          {updateStatus.updateLoading ? (
            <div>Updating</div>
          ) : updateStatus.updateError ? (
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <FontAwesomeIcon icon={faArrowRotateRight} />
              <div>Try Again</div>
            </div>
          ) : updateStatus.updateSuccess ? (
            <div>Updated!</div>
          ) : (
            <div>Update Profile</div>
          )}
        </button>
      </div>
    </RegisterContainer>
  );
};

export default Profile;
