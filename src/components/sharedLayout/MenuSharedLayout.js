import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { useUiContext } from "../../Context/UiContext";
import MenuInfoNav from "../menu/MenuInfoNav/MenuInfoNav";
import "./MenuSharedLayout.css";

const MenuSharedLayout = () => {
  const { setMenuState } = useMenuContext();
  const { restaurantName, isLoggedIn } = useUiContext();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   const controller = new AbortController();
  //   setMenuState(controller);
  //   return () => controller.abort();
  // }, []);

  // const navigateToMenu = () => {
  //   navigate("/");
  // };

  return (
    <div className="menu-container">
      <MenuInfoNav />
      <Outlet />
    </div>
  );
};

export default MenuSharedLayout;
