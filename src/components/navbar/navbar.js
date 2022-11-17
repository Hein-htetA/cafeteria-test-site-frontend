import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="nav-container">
      <button className="nav-button">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="logo-text-container">
        <p className="primary-logo-text">ytu</p>
        <p className="secondary-logo-text">cafeteria</p>
      </div>
    </nav>
  );
};

export default Navbar;
