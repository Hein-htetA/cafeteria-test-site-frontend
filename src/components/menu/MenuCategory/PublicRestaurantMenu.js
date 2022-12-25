import React from "react";
import { useParams } from "react-router-dom";
import { usePublicDataContext } from "../../../Context/PublicDataContext";
import MenuCategory from "./MenuCategory";
import "./RestaurantMenu.css";

const PublicRestaurantMenu = () => {
  const { restaurants } = usePublicDataContext();
  const { restaurantId } = useParams();
  const restaurant = restaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );
  return (
    <>
      <h2 className="restaurant-name-marketplace1">{restaurant.name}</h2>
      <MenuCategory />
    </>
  );
};

export default PublicRestaurantMenu;
