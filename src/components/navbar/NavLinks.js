import React from "react";
import "./NavLinks.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import OrderCount from "./OrderCount";
const activeStyle = { color: "#0478f5" };

const NavLinks = ({ navbar, closeNavbar }) => {
  const restaurantId = useSelector((state) => state.user.userData.restaurantId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.order.orderData);

  const orderCounts = orderData.reduce(
    (accumulator, currentValue) => {
      if (currentValue.orderState === "newOrder") {
        accumulator.newOrderCount += 1;
      } else if (
        currentValue.orderState === "order" ||
        currentValue.orderState === "onDelivery"
      ) {
        accumulator.orderServingCount += 1;
      } else if (currentValue.orderState === "recycleBin") {
        accumulator.recycleBinOrderCount += 1;
      } else {
        accumulator.completedOrderCount += 1;
      }
      return accumulator;
    },
    {
      newOrderCount: 0,
      orderServingCount: 30,
      recycleBinOrderCount: 2,
      completedOrderCount: 20,
    }
  );

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
          {!isLoggedIn ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            <OrderCount count={orderCounts.newOrderCount} />
          )}
        </NavLink>
        <hr />
        <NavLink
          to="/myAccount/order"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Orders Serving</li>
          {!isLoggedIn ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            <OrderCount count={orderCounts.orderServingCount} />
          )}
        </NavLink>
        <hr />
        <NavLink
          to="/myAccount/history"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Completed Orders</li>
          {!isLoggedIn ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            <OrderCount count={orderCounts.completedOrderCount} />
          )}
        </NavLink>
        <hr />

        <NavLink
          to="/myAccount/recycleBin"
          onClick={closeNavbar}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <li>Recycle Bin</li>
          {!isLoggedIn ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            <OrderCount count={orderCounts.recycleBinOrderCount} />
          )}
        </NavLink>
        <hr />
      </ul>
      <button className="marketplace-link" onClick={enterMarketplace}>
        <div className="marketplace-text">Enter Marketplace</div>
        <FontAwesomeIcon icon={faRightLong} className="marketplace-arrow" />
      </button>
    </div>
  );
};

export default NavLinks;
