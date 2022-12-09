import React from "react";
import { useParams } from "react-router-dom";
import MenuCategory from "../menu/MenuCategory/MenuCategory";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { restaurantName } = useParams();
  return (
    <>
      <h2 className="restaurant-name-marketplace1">{restaurantName}</h2>
      <MenuCategory />
    </>
  );
};

export default RestaurantMenu;
