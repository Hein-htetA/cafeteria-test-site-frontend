import React from "react";
import "./NavLinks.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const activeStyle = { color: "#0478f5" };

const NavLinks = ({ navbar, closeNavbar }) => {
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const enterMarketplace = () => {
    closeNavbar();
    navigate("/marketplace");
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
          to={`/myAccount/profile`}
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Profile</li>
          {!isLoggedIn && <FontAwesomeIcon icon={faLock} />}
        </NavLink>
        <hr />
        <NavLink
          to={
            restaurantId
              ? `/myAccount/myRestaurant/menu`
              : "/myAccount/myRestaurant/register"
          }
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>My Restaurant</li>
          {!isLoggedIn && <FontAwesomeIcon icon={faLock} />}
        </NavLink>
        <hr />
        <NavLink
          to="/myAccount/newOrder"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>New Orders</li>
          {!isLoggedIn && <FontAwesomeIcon icon={faLock} />}
        </NavLink>
        <hr />
        <NavLink
          to="/myAccount/order"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Orders Serving</li>
          {!isLoggedIn && <FontAwesomeIcon icon={faLock} />}
        </NavLink>
        <hr />
        <NavLink
          to="/myAccount/history"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Completed Orders</li>
          {!isLoggedIn && <FontAwesomeIcon icon={faLock} />}
        </NavLink>
        <hr />

        <NavLink
          to="/myAccount/recycleBin"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Recycle Bin</li>
          {!isLoggedIn && <FontAwesomeIcon icon={faLock} />}
        </NavLink>
        <hr />
      </ul>
      {/* {restaurant.name && (
        <p className="restaurant-name">***{" " + restaurant.name + " "}***</p>
      )} */}
      <button className="marketplace-link" onClick={enterMarketplace}>
        <div className="marketplace-text">Enter Marketplace</div>
        <FontAwesomeIcon icon={faRightLong} className="marketplace-arrow" />
      </button>
    </div>
  );
};

export default NavLinks;
