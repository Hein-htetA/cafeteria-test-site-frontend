import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";

const ProfileBtnGroup = (props) => {
  const dispatch = useDispatch();
  const { updateUser } = props;
  const error = useSelector((state) => state.user.error);
  const updateStatus = useSelector((state) => state.user.updateStatus);
  return (
    <div className="err-msg-profile-container">
      {error.serverError ? (
        <div className="profile-update-err-msg">{error.serverError}</div>
      ) : (
        <button
          className="update-profile-btn"
          onClick={() => dispatch(logoutUser())}
          disabled={updateStatus === "loading"}
        >
          Log Out
        </button>
      )}
      <button
        className="update-profile-btn"
        onClick={updateUser}
        disabled={updateStatus === "loading"}
      >
        {updateStatus === "loading" ? (
          <div>Updating</div>
        ) : updateStatus === "failed" ? (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
            <div>Try Again</div>
          </div>
        ) : updateStatus === "succeeded" ? (
          <div>Updated!</div>
        ) : (
          <div>Update</div>
        )}
      </button>
    </div>
  );
};

export default ProfileBtnGroup;
