import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { emptyCartPhoto } from "../../utils/baseUrl";
import "./EmptyCart.css";

const EmptyCart = () => {
  const navigate = useNavigate();
  const navigateToMarketplace = () => {
    navigate("/marketplace");
  };
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-img-container">
        <img src={emptyCartPhoto} alt="cart" />
        <div className="exclamation-mark">?</div>
      </div>
      <p className="empty-cart-text">
        You haven't added anything to your cart!
      </p>
      <button className="browse-btn" onClick={navigateToMarketplace}>
        Browse
      </button>
    </div>
  );
};

export default EmptyCart;
