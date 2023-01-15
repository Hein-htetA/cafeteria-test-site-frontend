import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAndProceedToCheckout,
  hideFullCheckoutWarning,
} from "../../../../features/cartSlice";
import "./FullCheckout.css";

const FullCheckout = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkCheckout = () => {
    dispatch(hideFullCheckoutWarning());
    navigate("/myAccount/cart/cartCheckout");
  };

  const clearAndProceed = () => {
    dispatch(clearAndProceedToCheckout(restaurantId));
    navigate("/myAccount/cart/cartCheckout");
  };

  return (
    <div className="full-checkout-position-container">
      <div className="full-checkout-container">
        <div className="full-cart-title">Crowded Checkout</div>
        <div className="full-cart-body">
          There is already an Order in Checkout! <br />
          Clear it and proceed?
        </div>
        <div className="full-checkout-btn-container">
          <button className="check-checkout-btn" onClick={checkCheckout}>
            check
          </button>
          <button className="clear-checkout-btn" onClick={clearAndProceed}>
            confirm
          </button>
        </div>
        <FontAwesomeIcon
          icon={faXmark}
          className="full-cart-xmark"
          onClick={() => dispatch(hideFullCheckoutWarning())}
        />
      </div>
    </div>
  );
};

export default FullCheckout;
