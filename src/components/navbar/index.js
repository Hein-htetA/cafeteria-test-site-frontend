import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import "./index.css";
import NavLinks from "./NavLinks";
import { useUiContext } from "../../Context/UiContext";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../Context/OrderContext";

const Navbar = () => {
  const { toggleNavbar, navbar } = useUiContext();
  const { data } = useOrderContext();
  const newOrderCount = data.filter(
    (order) => order.orderState === "newOrder"
  ).length;
  return (
    <nav className="nav-container">
      <div className="logo-text-container">
        <p className="primary-logo-text">ytu</p>
        <p className="secondary-logo-text">cafeteria</p>
      </div>
      <div className="logo-text-space"></div>
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
      <div className="envolope-container">
        <Link to="newOrder" className="envolope-link">
          <FontAwesomeIcon icon={faEnvelope} className={"envolope-icon"} />
          <span className="new-order-count">{newOrderCount}</span>
        </Link>
      </div>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
