import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuInfoNav.css";

const MenuInfoNav = () => {
  return (
    <div>
      <div className="restaurant-nav-link-container">
        <NavLink
          to={"menu"}
          className={({ isActive }) =>
            isActive ? "menu-info-link menu-info-link-active" : "menu-info-link"
          }
        >
          Menu
        </NavLink>
        <NavLink
          to={"info"}
          className={({ isActive }) =>
            isActive ? "menu-info-link menu-info-link-active" : "menu-info-link"
          }
        >
          Info
        </NavLink>
      </div>
    </div>
  );
};

export default MenuInfoNav;
