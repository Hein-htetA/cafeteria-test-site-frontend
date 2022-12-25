import React from "react";
import { Link } from "react-router-dom";

const ItemName = ({ name, menuId, restaurantId }) => {
  return (
    <Link
      to={`/marketplace/restaurant/${restaurantId}/menu/curry/${menuId}`}
      style={{
        fontSize: "1.1rem",
      }}
    >
      {name}
    </Link>
  );
};

export default ItemName;
