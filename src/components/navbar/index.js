import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faCircle } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import "./index.css";
import NavLinks from "./NavLinks";
import { useUiContext } from "../../Context/UiContext";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../Context/OrderContext";

const Navbar = () => {
  const { toggleNavbar, navbar, online } = useUiContext();
  const { data } = useOrderContext();
  const newOrderCount = data.filter(
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
          <div className="icon-placeholder"></div>
        </button>

        <div className="logo-text-container">
          <p className="primary-logo-text">Swal taw myay</p>
          <p className="secondary-logo-text">cafeteria</p>
        </div>

        <div className="envolope-container">
          <Link to="newOrder" className="envolope-link">
            <FontAwesomeIcon icon={faEnvelope} className={"envolope-icon"} />
            <span className="new-order-count">{newOrderCount}</span>
          </Link>
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
        </div>
        <NavLinks />
      </nav>
      <div className="logo-text-space"></div>
    </>
  );
};

export default Navbar;
