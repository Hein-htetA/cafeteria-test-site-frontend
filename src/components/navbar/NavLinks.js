import React from "react";
import "./NavLinks.css";
import { useUiContext } from "../../Context/UiContext";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const { navbar, toggleNavbar } = useUiContext();
  return (
    <div
      className={
        navbar
          ? "navlinks-container"
          : "navlinks-container navlinks-container-hidden"
      }
    >
      <ul className="navlinks-ul">
        <Link to="/menu" onClick={toggleNavbar}>
          <li>Menu</li>
        </Link>
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
