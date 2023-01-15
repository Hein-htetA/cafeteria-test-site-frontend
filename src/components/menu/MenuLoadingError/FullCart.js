import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideFullCartWarning } from "../../../features/cartSlice";
import "./FullCart.css";

const FullCart = () => {
  const fullCartWarning = useSelector((state) => state.cart.fullCartWarning);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkCartCheckout = () => {
    navigate("/myAccount/cart/cartMenu");
  };

  if (!fullCartWarning) {
    return;
  }

  return (
    <div className="full-cart-position-container">
      <div className="full-cart-container">
        <div className="full-cart-title">Your Cart is Full!</div>
        <div className="full-cart-body">
          Maximun number of restaurants (3) allowed in cart is reached
        </div>
        <div className="full-cart-btn-container">
          <button className="check-cart-btn" onClick={checkCartCheckout}>
            check cart
          </button>
        </div>
        <FontAwesomeIcon
          icon={faXmark}
          className="full-cart-xmark"
          onClick={() => dispatch(hideFullCartWarning())}
        />
      </div>
    </div>
  );
};

export default FullCart;
