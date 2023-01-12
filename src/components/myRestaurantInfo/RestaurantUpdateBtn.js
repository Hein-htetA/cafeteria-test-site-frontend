import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurant } from "../../features/restaurantSlice";

const RestaurantUpdateBtn = ({ formValues }) => {
  const updateRestaurantStatus = useSelector(
    (state) => state.restaurant.updateRestaurantStatus
  );
  const dispatch = useDispatch();

  return (
    <div className="reg-res-btn-container">
      {updateRestaurantStatus === "failed" && (
        <div className="reg-res-err-msg">Something went wrong! Try Again?</div>
      )}
      <button
        className="reg-res-btn"
        onClick={() => dispatch(updateRestaurant(formValues))}
        disabled={updateRestaurantStatus === "loading"}
      >
        {updateRestaurantStatus === "loading" ? (
          "Updating..."
        ) : updateRestaurantStatus === "failed" ? (
          <>
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              style={{ marginRight: "5px" }}
            />
            <div>Try Again</div>
          </>
        ) : updateRestaurantStatus === "succeeded" ? (
          "Updated!"
        ) : (
          "Update"
        )}
      </button>
    </div>
  );
};

export default RestaurantUpdateBtn;
