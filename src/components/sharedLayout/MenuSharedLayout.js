import React from "react";
import { Outlet } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import "./MenuSharedLayout.css";

const MenuSharedLayout = () => {
  const menuData = useMenuContext();
  return (
    <div className="menu-container">
      <h1>Our Menu</h1>
      <Outlet />
    </div>
  );
};

export default MenuSharedLayout;
