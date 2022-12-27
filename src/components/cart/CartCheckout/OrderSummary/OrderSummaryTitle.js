import { faClipboard, faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCartContext } from "../../../../Context/CartContext";

const OrderSummaryTitle = () => {
  const { checkout } = useCartContext();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "1.1rem",
        marginRight: "auto",
        marginBottom: "10px",
      }}
    >
      <FontAwesomeIcon icon={faClipboard} />{" "}
      <div>Order Summary ({" " + checkout.restaurantName + " "})</div>
    </div>
  );
};

export default OrderSummaryTitle;
