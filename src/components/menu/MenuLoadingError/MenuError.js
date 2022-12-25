import React from "react";
import { useUiContext } from "../../../Context/UserContext";

const MenuError = (props) => {
  const { setRestaurantState } = props;

  return (
    <div className="empty-box">
      <button onClick={() => setRestaurantState(new AbortController())}>
        Try Again ?
      </button>
    </div>
  );
};

export default MenuError;
