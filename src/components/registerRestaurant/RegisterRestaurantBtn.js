import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./RegisterRestaurantBtn.css";

const RegisterRestaurantBtn = ({
  handleRegisterRestaurant,
  registerStatus,
}) => {
  return (
    <div className="reg-res-btn-container">
      {registerStatus.registerError && (
        <div className="reg-res-err-msg">Something went wrong! Try Again?</div>
      )}
      <button className="reg-res-btn" onClick={handleRegisterRestaurant}>
        {registerStatus.registerLoading ? (
          "Registering..."
        ) : registerStatus.registerError ? (
          <>
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              style={{ marginRight: "5px" }}
            />
            <div>Try Again</div>
          </>
        ) : (
          "Register"
        )}
      </button>
    </div>
  );
};

export default RegisterRestaurantBtn;
