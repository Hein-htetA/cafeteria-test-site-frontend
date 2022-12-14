import React from "react";
import { defaultProfilePhoto } from "../utils/baseUrl";

const ProfilePhoto = (props) => {
  const {
    profilePhotoUrl,
    profilePhoto,
    onChangeProfile,
    removeProfile,
    profileImage,
  } = props;
  return (
    <>
      <div className="profile-photo-container">
        <img
          src={profileImage || profilePhotoUrl || defaultProfilePhoto}
          alt="profile"
          className="profile-photo"
        />
        {profilePhoto && (
          <div className="profile-image-error-message">
            <div className="profile-image-error-message-first">
              Cannot add image larger than
            </div>
            <div className="profile-image-error-message-second">* 6MB *</div>
          </div>
        )}
      </div>
      <div className="profile-btn-container">
        <label htmlFor="inputTag" className="profile-image-icon">
          <div className="upload-profile-btn">Add Photo</div>
          <input
            id="inputTag"
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            style={{ display: "none" }}
            onChange={onChangeProfile}
          />
        </label>

        <button className="remove-profile-btn" onClick={removeProfile}>
          remove
        </button>
      </div>
    </>
  );
};

export default ProfilePhoto;
