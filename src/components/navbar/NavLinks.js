import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./NavLinks.css";
import { useUiContext } from "../../Context/UiContext";

const NavLinks = () => {
  const { navbar } = useUiContext();
  return (
    <div
      className={
        navbar
          ? "navlinks-container"
          : "navlinks-container navlinks-container-hidden"
      }
    >
      <ul className="navlinks-ul">
        <li>Menu</li>
        <hr />
        <li>Trash Bin</li>
        <hr />
        <li>History</li>
        <hr />
      </ul>
      <p className="restaurant-name">T-Food House</p>
    </div>
  );
};

export default NavLinks;
