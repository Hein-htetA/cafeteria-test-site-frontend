import React from "react";
import SingleMenu from "./SingleMenu";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import MenuLoading from "./MenuLoadingError/MenuLoading";
import MenuError from "./MenuLoadingError/MenuError";
import NewSingleMenu from "./NewSingleMenu";
import { useSelector } from "react-redux";

const Menu = () => {
  const menuData = useSelector((state) => state.restaurant.menuData);
  const menuStatus = useSelector((state) => state.restaurant.menuStatus);
  const { menuCategory } = useParams();

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
          : "additional items"}
      </h2>
      <div className="single-menu-container">
        {menuStatus === "loading" ? (
          <MenuLoading />
        ) : menuStatus === "failed" ? (
          <MenuError />
        ) : (
          <>
            {menuData
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
