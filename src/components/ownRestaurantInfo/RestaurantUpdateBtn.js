import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RestaurantUpdateBtn = ({ updateStatus, handleUpdateRestaurant }) => {
  return (
    <div className="reg-res-btn-container">
      {updateStatus.updateError && (
        <div className="reg-res-err-msg">Something went wrong! Try Again?</div>
      )}
      <button className="reg-res-btn" onClick={handleUpdateRestaurant}>
        {updateStatus.updateLoading ? (
          "Updating..."
        ) : updateStatus.updateError ? (
          <>
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              style={{ marginRight: "5px" }}
            />
            <div>Try Again</div>
          </>
        ) : (
          "Update"
        )}
      </button>
    </div>
  );
};

export default RestaurantUpdateBtn;
