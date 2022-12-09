import React, { useEffect } from "react";
import { useMenuContext } from "../../Context/MenuContext";
import SingleMenu from "./SingleMenu";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import MenuLoading from "./MenuLoadingError/MenuLoading";
import MenuError from "./MenuLoadingError/MenuError";
import NewSingleMenu from "./NewSingleMenu";

const Menu = ({ isOwner }) => {
  const { data, menuLoading, menuError } = useMenuContext();
  const { menuCategory } = useParams();
  //console.log("category", menuCategory);
  return (
    <div className="single-category-container">
      <h2 className="category-title">
        {menuCategory === "curry"
          ? "rice & curries"
          : menuCategory === "sideDish"
          ? "side dishes"
          : menuCategory === "drink"
          ? "snacks & drinks"
          : menuCategory === "signature"
          ? "signature dishes"
          : "additionals"}
      </h2>
      <div className="single-menu-container">
        {menuLoading ? (
          <MenuLoading />
        ) : menuError ? (
          <MenuError />
        ) : (
          <>
            {data
              .filter((menu) => menu.category === menuCategory)
              .map((menu) => (
                <Link
                  key={menu._id}
                  to={`../${menu.category}/${menu._id}`}
                  className="menu-link"
                >
                  <SingleMenu {...menu} />
                </Link>
              ))}
            <NewSingleMenu />
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
