import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MenuCategory from "./MenuCategory";
import "./RestaurantMenu.css";

const PublicRestaurantMenu = () => {
  //const { restaurants } = usePublicDataContext();
  const publicRestaurants = useSelector(
    (state) => state.publicData.publicRestaurants
  );
  const { restaurantId } = useParams();
  const restaurant = publicRestaurants.find(
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
