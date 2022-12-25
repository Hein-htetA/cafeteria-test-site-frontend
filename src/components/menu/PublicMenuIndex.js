import React, { useEffect } from "react";
import { useMenuContext } from "../../Context/MenuContext";
import SingleMenu from "./SingleMenu";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import MenuLoading from "./MenuLoadingError/MenuLoading";
import { usePublicDataContext } from "../../Context/PublicDataContext";
import PublicMenuError from "./MenuLoadingError/PublicMenuError";
import PublicSingleMenu from "./PublicSingleMenu";
import EmptyMenuInCategory from "./MenuDelete/EmptyMenuInCategory";
import FullCart from "./MenuLoadingError/FullCart";

const PublicMenu = () => {
  const { menu, menuLoading, menuError } = usePublicDataContext();
  const { menuCategory, restaurantId } = useParams();

  const menuAfterFilter = menu.filter(
    (menu) =>
      menu.category === menuCategory && menu.restaurantId === restaurantId
  );

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
        {menuLoading ? (
          <MenuLoading />
        ) : menuError ? (
          <PublicMenuError />
        ) : (
          <>
            {menuAfterFilter.length === 0 && <EmptyMenuInCategory />}
            {menuAfterFilter.map((menu) => (
              <div key={menu._id} to={`${menu._id}`} className="menu-link">
                <PublicSingleMenu menu={menu} />
              </div>
            ))}
          </>
        )}
      </div>
      <FullCart />
    </div>
  );
};

export default PublicMenu;
