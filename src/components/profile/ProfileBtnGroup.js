import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProfileBtnGroup = (props) => {
  const { errorMsg, logOut, updateUser, updateStatus } = props;
  return (
    <div className="err-msg-profile-container">
      {errorMsg ? (
        <div className="profile-update-err-msg">{errorMsg}</div>
      ) : (
        <button
          className="update-profile-btn"
          onClick={logOut}
          disabled={updateStatus.updateError}
        >
          Log Out
        </button>
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
          <div>Update</div>
        )}
      </button>
    </div>
  );
};

export default ProfileBtnGroup;
