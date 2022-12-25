import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCartContext } from "../../../Context/CartContext";

const ClearCartBtn = ({ restaurantId }) => {
  const { removeFromCart } = useCartContext();
  return (
    <button
      style={{
        position: "absolute",
        top: "0px",
        right: "5px",
        border: "none",
        backgroundColor: "transparent",
      }}
      onClick={() => removeFromCart(restaurantId)}
    >
      <FontAwesomeIcon
        icon={faXmark}
        style={{
          fontSize: "1.5rem",
          color: "rgb(238, 94, 118)",
        }}
      />
      {/* <div
        style={{
          fontSize: "1rem",
          color: "rgb(238, 94, 118)",
        }}
      >
        clear
      </div> */}
    </button>
  );
};

export default ClearCartBtn;
