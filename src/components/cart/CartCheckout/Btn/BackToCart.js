import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../../Context/CartContext";
import { backToCart } from "../../../../features/cartSlice";

const BackToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backToCartAndNavigate = () => {
    dispatch(backToCart());
    navigate("/myAccount/cart/cartMenu");
  };
  const placeOrderStatus = useSelector((state) => state.cart.placeOrderStatus);
  return (
    <button
      className="checkout-btn"
      onClick={backToCartAndNavigate}
      disabled={placeOrderStatus === "loading"}
    >
      <FontAwesomeIcon icon={faAnglesLeft} style={{ marginRight: "auto" }} />
      <div className="checkout-btn-text">Back To Cart</div>
    </button>
  );
};

export default BackToCart;
