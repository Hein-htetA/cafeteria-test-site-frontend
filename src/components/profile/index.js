import React, { useState } from "react";
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
import "./index.css";
import ProfileTitle from "./ProfileTitle";
import ProfileBtnGroup from "./ProfileBtnGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  resetStatusAndError,
  updateUser as update,
} from "../../features/userSlice";

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
  const error = useSelector((state) => state.user.error);
  const userData = useSelector((state) => state.user.userData);
  const updateStatus = useSelector((state) => state.user.updateStatus);

  const [formValues, setFormValues] = useState({
    ...userData,
    profileImage: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  const onChangeProfile = async (e) => {
    const inputImage = e.target.files[0];
    dispatch(resetStatusAndError());
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
    dispatch(resetStatusAndError());
  };

  const removeProfile = () => {
    setFormValues({ ...formValues, profilePhotoUrl: "", profileImage: "" });
    dispatch(resetStatusAndError());
  };

  const updateUser = () => {
    const error = validate(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;

    dispatch(update(formValues));
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
        disabled={updateStatus === "loading"}
        isOwner={true}
      />
      <RegisterInfoContainer>
        <Name
          name={formValues.name}
          onChangeInput={onChangeInput}
          nameError={formErrors.nameError}
          disabled={updateStatus === "loading"}
        />
        <Phone
          phone={formValues.phone}
          onChangeInput={onChangeInput}
          phoneError={
            formErrors.phoneError || (error.serverError && "Unavailable")
          } //error is reply from server
          disabled={updateStatus === "loading"}
        />
        <Address
          onChangeInput={onChangeInput}
          address={formValues.address}
          disabled={updateStatus === "loading"}
        />
        <Email
          onChangeInput={onChangeInput}
          email={formValues.email}
          disabled={updateStatus === "loading"}
        />
        <ExtraPhone
          onChangeInput={onChangeInput}
          extraPhone={formValues.extraPhone}
          disabled={updateStatus === "loading"}
        />
      </RegisterInfoContainer>
      <ProfileBtnGroup updateUser={updateUser} />
    </RegisterContainer>
  );
};

export default Profile;
