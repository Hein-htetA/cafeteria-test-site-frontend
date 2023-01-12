import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";
import "./RestaurantSharedLayout.css";

const RestaurantSharedLayout = () => {
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);

  return (
    <div className="restaurant-container">
      {restaurantId && <MenuInfoNav />}
      <Outlet />
    </div>
  );
};

export default RestaurantSharedLayout;
