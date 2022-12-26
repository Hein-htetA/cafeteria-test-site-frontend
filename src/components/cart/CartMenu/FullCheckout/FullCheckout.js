import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCartContext } from "../../../../Context/CartContext";
import "./FullCheckout.css";

const FullCheckout = () => {
  const { hideCrowdedCheckoutWarning, checkCheckout, clearAndProceedCheckout } =
    useCartContext();
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
          <button
            className="clear-checkout-btn"
            onClick={clearAndProceedCheckout}
          >
            confirm
          </button>
        </div>
        <FontAwesomeIcon
          icon={faXmark}
          className="full-cart-xmark"
          onClick={hideCrowdedCheckoutWarning}
        />
      </div>
    </div>
  );
};

export default FullCheckout;
