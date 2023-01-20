import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import "./MenuDetailAddToCartBtn.css";

const MenuDetailAddToCartBtn = ({ menu, restaurant, outOfStock }) => {
  const [count, setCount] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addAndNavigate = () => {
    dispatch(addToCart({ restaurant, menu, count }));
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
          disabled={count === 1 || outOfStock}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div>{count}</div>
        <button
          className="inc-dec-btn"
          onClick={incCount}
          disabled={count === 10 || outOfStock}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={addAndNavigate}
        disabled={outOfStock}
      >
        Add to cart
      </button>
    </div>
  );
};

export default MenuDetailAddToCartBtn;
