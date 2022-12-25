import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { useUserContext } from "../../Context/UserContext";

import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";
import "./RestaurantSharedLayout.css";

const RestaurantSharedLayout = () => {
  const { user } = useUserContext();
  const { restaurant, setRestaurantState } = useMenuContext();

  useEffect(() => {
    if (!user.restaurantId) return; //user doesn't have restaurant
    if (restaurant._id) return; //dont fetch again
    const controller = new AbortController();
    setRestaurantState(controller, user.restaurantId); //fetch both restaurant and menu
    return () => controller.abort();
  }, []);

  return (
    <div className="restaurant-container">
      <MenuInfoNav />
      <Outlet />
    </div>
  );
};

export default RestaurantSharedLayout;
