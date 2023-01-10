import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

const ProfileBtnGroup = (props) => {
  const dispatch = useDispatch();
  const { updateUser } = props;
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  return (
    <div className="err-msg-profile-container">
      {error.serverError ? (
        <div className="profile-update-err-msg">{error.serverError}</div>
      ) : (
        <button
          className="update-profile-btn"
          onClick={() => dispatch(logoutUser())}
          disabled={status === "loading"}
        >
          Log Out
        </button>
      )}
      <button
        className="update-profile-btn"
        onClick={updateUser}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <div>Updating</div>
        ) : status === "failed" ? (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
            <div>Try Again</div>
          </div>
        ) : status === "succeeded" ? (
          <div>Updated!</div>
        ) : (
          <div>Update</div>
        )}
      </button>
    </div>
  );
};

export default ProfileBtnGroup;
