import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { useUiContext } from "../../Context/UiContext";
import "./MenuSharedLayout.css";

const MenuSharedLayout = () => {
  const { setMenuState } = useMenuContext();
  const { restaurantName } = useUiContext();

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setMenuState(controller);
    return () => controller.abort();
  }, []);

  const navigateToMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="menu-container">
      <h2 className="menu-restaurant-name" onClick={navigateToMenu}>
        {restaurantName}
      </h2>
      <Outlet />
    </div>
  );
};

export default MenuSharedLayout;
