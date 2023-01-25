import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import "./index.css";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const openNavbar = () => {
    setNavbar(true);
  };

  const closeNavbar = () => {
    setNavbar(false);
  };

  const toggleNavbar = () => {
    setNavbar((navbar) => !navbar);
  };

  const totalCount = useSelector((state) => state.cart.totalCount);
  const online = useSelector((state) => state.user.online);
  const orderData = useSelector((state) => state.order.orderData);

  const newOrderCount = orderData.filter(
    (order) => order.orderState === "newOrder"
  ).length;

  return (
    <>
      <nav className="nav-container">
        <button className="nav-button" onClick={toggleNavbar}>
          <FontAwesomeIcon
            icon={faXmark}
            className={navbar ? "fa-xmark" : "fa-xmark fa-xmark-hidden"}
          />
          <FontAwesomeIcon
            icon={faBars}
            className={navbar ? "fa-bar fa-bar-hidden" : "fa-bar"}
          />
        </button>
        <div className="icon-placeholder"></div>
        <div className="logo-text-container">
          <p className="primary-logo-text">YTU</p>
          <p className="secondary-logo-text">cafeteria</p>
        </div>

        <div className="envolope-container">
          <div className="envolope-link-container">
            <Link
              to="myAccount/cart/cartMenu"
              className="envolope-link"
              onClick={closeNavbar}
            >
              <FontAwesomeIcon icon={faCartPlus} className={"envolope-icon"} />
              <span className="new-order-count">{totalCount}</span>
            </Link>
            <Link
              to="myAccount/newOrder"
              className="envolope-link"
              onClick={closeNavbar}
            >
              <FontAwesomeIcon icon={faEnvelope} className={"envolope-icon"} />
              <span className="new-order-count">{newOrderCount}</span>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="online-indicator">
              <div className={online ? "circle-icon" : "circle-icon-offline"}>
                .
              </div>
              <p
                className={
                  online ? "online-indicator-text" : "offline-indicator-text"
                }
              >
                {online ? "ONLINE" : "OFFLINE"}
              </p>
            </div>
          )}
        </div>
        <NavLinks navbar={navbar} closeNavbar={closeNavbar} />
      </nav>
      <div className="logo-text-space"></div>
    </>
  );
};

export default Navbar;
