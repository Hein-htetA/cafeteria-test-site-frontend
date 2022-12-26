import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCartContext } from "../../../../Context/CartContext";

const BackToCart = () => {
  const { backToCart } = useCartContext();
  return (
    <button className="checkout-btn" onClick={backToCart}>
      <FontAwesomeIcon icon={faAnglesLeft} style={{ marginRight: "auto" }} />
      <div className="checkout-btn-text">Back To Cart</div>
    </button>
  );
};

export default BackToCart;
