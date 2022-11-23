import React from "react";
import "./NavLinks.css";
import { useUiContext } from "../../Context/UiContext";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const { navbar, toggleNavbar } = useUiContext();
  let activeStyle = { color: "#0478f5" };
  return (
    <div
      className={
        navbar
          ? "navlinks-container"
          : "navlinks-container navlinks-container-hidden"
      }
    >
      <ul className="navlinks-ul">
        <NavLink
          to="/"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Orders</li>
        </NavLink>
        <hr />
        <NavLink
          to="menu"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Menu</li>
        </NavLink>
        <hr />
        <NavLink
          to="trashBin"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Trash Bin</li>
        </NavLink>
        <hr />
        <NavLink
          to="history"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>History</li>
        </NavLink>
        <hr />
      </ul>
      <p className="restaurant-name">T-Food House</p>
    </div>
  );
};

export default NavLinks;
