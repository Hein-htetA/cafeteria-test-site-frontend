import React from "react";

const CartRestaurantName = ({
  restaurantName,
  navigateToRestaurant,
  restaurantId,
}) => {
  return (
    <h2
      style={{
        marginTop: "-5px",
        marginBottom: "15px",
        padding: "3px 10px",
        borderRadius: "0.5rem",
        fontWeight: "normal",
      }}
      onClick={() => navigateToRestaurant(restaurantId)}
    >
      {restaurantName}
    </h2>
  );
};

export default CartRestaurantName;
