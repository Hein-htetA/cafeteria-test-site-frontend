import {
  faArrowAltCircleDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCartContext } from "../../../Context/CartContext";
import "./ToggleItemNumber.css";

const ToggleItemNumber = ({ count, restaurantId, menuId }) => {
  const { incCount, decCount } = useCartContext();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        className="toggle-item-number-btn"
        onClick={() => incCount(restaurantId, menuId)}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <div>{count}</div>
      <button
        className="toggle-item-number-btn"
        onClick={() => decCount(restaurantId, menuId)}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};

export default ToggleItemNumber;
