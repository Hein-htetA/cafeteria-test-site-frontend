import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const PlaceOrderBtn = ({ handlePlaceOrder, placeOrderLoading }) => {
  const placeOrderStatus = useSelector((state) => state.cart.placeOrderStatus);
  const restaurantRecentlyClosedModal = useSelector(
    (state) => state.cart.restaurantRecentlyClosedModal
  );
  return (
    <button
      className="checkout-btn"
      onClick={handlePlaceOrder}
      disabled={placeOrderStatus === "loading" || restaurantRecentlyClosedModal}
    >
      <div className="checkout-btn-text">
        {placeOrderStatus === "loading" ? "Ordering" : "Place Order"}
      </div>
      <FontAwesomeIcon icon={faAnglesRight} style={{ marginLeft: "auto" }} />
    </button>
  );
};

export default PlaceOrderBtn;
