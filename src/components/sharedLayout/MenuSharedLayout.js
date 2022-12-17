import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { TestContextProvider } from "../../Context/TestContext";
import { useUiContext } from "../../Context/UiContext";
import TestComponent from "../../TestComponent";
import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";
import "./MenuSharedLayout.css";

const MenuSharedLayout = () => {
  const { user } = useUiContext();
  const { setMenuState, restaurant, setRestaurantState } = useMenuContext();
  const { isLoggedIn } = useUiContext();

  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   if (!restaurant._id) return;
  //   const controller = new AbortController();
  //   setMenuState(controller);
  //   return () => controller.abort();
  // }, []);

  // const navigateToMenu = () => {
  //   navigate("/");
  // };

  useEffect(() => {
    if (!user.restaurantId) return; //user doesn't have restaurant
    if (restaurant._id) return; //dont fetch again
    const controller = new AbortController();
    setRestaurantState(controller, user.restaurantId);
    return () => controller.abort();
  }, []);

  return (
    <div className="menu-container">
      {user.restaurantId && <MenuInfoNav />}
      <Outlet /> :
    </div>
  );
};

export default MenuSharedLayout;
