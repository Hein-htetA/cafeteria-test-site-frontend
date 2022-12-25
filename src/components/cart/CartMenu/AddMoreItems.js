import React from "react";
import { useNavigate } from "react-router-dom";

const AddMoreItems = ({ restaurantId, navigateToRestaurant }) => {
  return (
    <button
      style={{
        border: "none",
        marginRight: "auto",
        color: "rgb(238, 94, 118)",
        backgroundColor: "transparent",
        marginBottom: "10px",
      }}
      onClick={() => navigateToRestaurant(restaurantId)}
    >
      Add More Items
    </button>
  );
};

export default AddMoreItems;
