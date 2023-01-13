import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import MenuLoading from "./MenuLoadingError/MenuLoading";
import PublicMenuError from "./MenuLoadingError/PublicMenuError";
import PublicSingleMenu from "./PublicSingleMenu";
import EmptyMenuInCategory from "./MenuDelete/EmptyMenuInCategory";
import FullCart from "./MenuLoadingError/FullCart";
import { useSelector } from "react-redux";

const PublicMenu = () => {
  const { menuCategory, restaurantId } = useParams();

  const publicRestaurants = useSelector(
    (state) => state.publicData.publicRestaurants
  );
  const menuStatus = useSelector((state) => state.publicData.menuStatus);

  const menuAfterFilter = publicRestaurants.find(
    (restaurant) => restaurant._id === restaurantId
  ).menu;

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
          <PublicMenuError />
        ) : (
          <>
            {/* menuFilter is undefined on refresh/// error prevent fetching menu */}
            {menuAfterFilter?.length === 0 && <EmptyMenuInCategory />}
            {menuAfterFilter?.map((menu) => (
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
