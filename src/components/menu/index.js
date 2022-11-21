import React from "react";
import { useMenuContext } from "../../Context/MenuContext";
import SingleMenu from "./SingleMenu";
import { Link } from "react-router-dom";
import "./index.css";

const Menu = () => {
  const menuData = useMenuContext();
  console.log("menudata", menuData);
  return (
    <>
      {menuData.map((menu) => (
        <Link key={menu.id} to={`${menu.id}`} className="menu-link">
          <SingleMenu {...menu} />
        </Link>
      ))}
    </>
  );
};

export default Menu;
