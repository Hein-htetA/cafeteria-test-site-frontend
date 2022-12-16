import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import { useMenuContext } from "../../../Context/MenuContext";
import MenuCategory from "./MenuCategory";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { restaurant, restaurantLoading } = useMenuContext();
  return (
    <>
      <h2 className="restaurant-name-marketplace1">
        {restaurantLoading ? (
          <FontAwesomeIcon icon={faCircleNotch} spin />
        ) : (
          restaurant.name
        )}
      </h2>
      <MenuCategory />
    </>
  );
};

export default RestaurantMenu;
