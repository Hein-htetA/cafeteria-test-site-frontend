import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./RegisterRestaurantBtn.css";
import { useDispatch, useSelector } from "react-redux";
import { registerRestaurant } from "../../features/restaurantSlice";
import { useNavigate } from "react-router-dom";

const RegisterRestaurantBtn = ({ handleRegisterRestaurant }) => {
  const registerRestaurantStatus = useSelector(
    (state) => state.restaurant.registerRestaurantStatus
  );

  return (
    <div className="reg-res-btn-container">
      {registerRestaurantStatus === "failed" && (
        <div className="reg-res-err-msg">Something went wrong! Try Again?</div>
      )}
      <button className="reg-res-btn" onClick={handleRegisterRestaurant}>
        {registerRestaurantStatus === "loading" ? (
          "Registering..."
        ) : registerRestaurantStatus === "failed" ? (
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
