import {
  faArrowAltCircleDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleItemsCount } from "../../../features/cartSlice";
import "./ToggleItemNumber.css";

const ToggleItemNumber = ({ count, restaurantId, menuId }) => {
  const dispatch = useDispatch();
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
        onClick={() =>
          dispatch(toggleItemsCount({ restaurantId, menuId, count: 1 }))
        }
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <div>{count}</div>
      <button
        className="toggle-item-number-btn"
        onClick={() =>
          dispatch(toggleItemsCount({ restaurantId, menuId, count: -1 }))
        }
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};

export default ToggleItemNumber;
