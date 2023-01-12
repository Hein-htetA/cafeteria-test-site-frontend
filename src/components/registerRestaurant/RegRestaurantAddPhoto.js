import React from "react";
import { useSelector } from "react-redux";

const RegRestaurantAddPhoto = ({ onChangePhoto, removePhoto }) => {
  const updateRestaurantStatus = useSelector(
    (state) => state.restaurant.updateRestaurantStatus
  );
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="profile-btn-container">
        <label htmlFor="inputTag" className="profile-image-icon">
          <div className="upload-profile-btn">Add Photo</div>
          <input
            id="inputTag"
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            style={{ display: "none" }}
            onChange={onChangePhoto}
            disabled={updateRestaurantStatus === "loading"}
          />
        </label>

        <button className="remove-profile-btn" onClick={removePhoto}>
          remove
        </button>
      </div>
    </div>
  );
};

export default RegRestaurantAddPhoto;
