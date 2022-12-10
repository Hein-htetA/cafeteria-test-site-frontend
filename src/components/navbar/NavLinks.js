import React from "react";
import "./NavLinks.css";
import { useUiContext } from "../../Context/UiContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
const activeStyle = { color: "#0478f5" };

const NavLinks = () => {
  const { navbar, toggleNavbar, restaurantName, isLoggedIn } = useUiContext();
  const navigate = useNavigate();

  const enterMarketplace = () => {
    toggleNavbar();
    navigate("/");
  };

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
          to={`/profile`}
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Profile</li>
        </NavLink>
        <hr />
        <NavLink
          to={`/myRestaurant/${restaurantName}`}
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>My Restaurant</li>
        </NavLink>
        <hr />
        <NavLink
          to="/myRestaurant/newOrder"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>New Orders</li>
        </NavLink>
        <hr />
        <NavLink
          to="/myRestaurant/order"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Orders Serving</li>
        </NavLink>
        <hr />
        <NavLink
          to="/myRestaurant/history"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Completed Orders</li>
        </NavLink>
        <hr />

        <NavLink
          to="/myRestaurant/recycleBin"
          onClick={toggleNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Recycle Bin</li>
        </NavLink>
        <hr />
      </ul>
      <p className="restaurant-name">***{" " + restaurantName + " "}***</p>
      <button className="marketplace-link" onClick={enterMarketplace}>
        <div className="marketplace-text">Enter Marketplace</div>
        <FontAwesomeIcon icon={faRightLong} className="marketplace-arrow" />
      </button>
    </div>
  );
};

export default NavLinks;
