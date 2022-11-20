import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./index.css";
import NavLinks from "./NavLinks";
import { useUiContext } from "../../Context/UiContext";

const Navbar = () => {
  const { toggleNavbar, navbar } = useUiContext();
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
      <NavLinks />
    </nav>
  );
};

export default Navbar;
