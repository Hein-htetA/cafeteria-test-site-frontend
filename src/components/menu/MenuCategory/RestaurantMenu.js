import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMenuContext } from "../../../Context/MenuContext";
import MenuCategory from "./MenuCategory";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  //const { restaurant, restaurantLoading } = useMenuContext();
  const restaurantName = useSelector(
    (state) => state.restaurant.restaurantData.name
  );
  const restaurantStatus = useSelector(
    (state) => state.restaurant.restaurantStatus
  );
  return (
    <>
      <h2 className="restaurant-name-marketplace1">
        {restaurantStatus === "loading" ? (
          <FontAwesomeIcon icon={faCircleNotch} spin />
        ) : (
          restaurantName
        )}
      </h2>
      <MenuCategory />
    </>
  );
};

export default RestaurantMenu;
