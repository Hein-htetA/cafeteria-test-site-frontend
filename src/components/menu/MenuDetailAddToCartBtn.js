import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import "./MenuDetailAddToCartBtn.css";

const MenuDetailAddToCartBtn = ({ menu, restaurant }) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useCartContext();

  const navigate = useNavigate();

  const addAndNavigate = () => {
    addToCart(restaurant, menu, count);
    navigate(-1);
  };

  const incCount = () => {
    setCount(count + 1);
  };
  const decCount = () => {
    setCount(count - 1);
  };
  return (
    <div className="add-to-cart-container">
      <div className="inc-dec-container">
        <button
          className="inc-dec-btn"
          onClick={decCount}
          disabled={count === 1}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div>{count}</div>
        <button
          className="inc-dec-btn"
          onClick={incCount}
          disabled={count === 10}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <button className="add-to-cart-btn" onClick={addAndNavigate}>
        Add to cart
      </button>
    </div>
  );
};

export default MenuDetailAddToCartBtn;
