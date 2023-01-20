import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCheckout,
  hideRestaurantRecentlyClosedModal,
} from "../../../../features/cartSlice";
import "./RestaurantClosedModal.css";
import { useOnClickOutside } from "./useOnClickOutside";

const RestaurantClosedModal = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useOnClickOutside(ref);

  const navigateAndClear = () => {
    dispatch(clearCheckout());
    dispatch(hideRestaurantRecentlyClosedModal());
    navigate("/marketplace");
  };

  return (
    <div className="restaurant-closed-modal-container">
      <div ref={ref} className="restaurant-closed-modal">
        <div className="restaurant-closed-modal-title">
          <span>The restaurant</span> was recently closed.
        </div>
        <i>We're sorry for the inconvenience.</i>
        <button className="try-another-restaurants" onClick={navigateAndClear}>
          Try Another Restaurants?
        </button>
        <button
          style={{
            position: "absolute",
            top: "0px",
            right: "5px",
            border: "none",
            backgroundColor: "transparent",
            zIndex: "0",
          }}
          onClick={() => dispatch(hideRestaurantRecentlyClosedModal())}
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{
              fontSize: "1.5rem",
              color: "rgb(238, 94, 118)",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default RestaurantClosedModal;
