import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import "./MenuInfoNav.css";

const MenuInfoNav = () => {
  const [navActive, setNavActive] = useState({
    menu: true,
    info: false,
  });
  const navigate = useNavigate();

  const menuOnclick = () => {
    setNavActive({ menu: true, info: false });
    navigate("");
  };
  const infoOnclick = () => {
    setNavActive({ menu: false, info: true });
    navigate("./info");
  };
  return (
    <div>
      <div className="restaurant-nav-link-container">
        <button
          className={
            navActive.menu
              ? "menu-info-link menu-info-link-active"
              : "menu-info-link"
          }
          onClick={menuOnclick}
        >
          Menu
        </button>
        <button
          className={
            navActive.info
              ? "menu-info-link menu-info-link-active"
              : "menu-info-link"
          }
          onClick={infoOnclick}
        >
          Info
        </button>
      </div>
    </div>
  );
};

export default MenuInfoNav;
