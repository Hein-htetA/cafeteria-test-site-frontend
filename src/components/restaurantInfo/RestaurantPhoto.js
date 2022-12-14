import React from "react";
import { defaultRestaurantPhoto } from "../utils/baseUrl";

const RestaurantPhoto = (props) => {
  const { restaurantPhotoUrl, restaurantImage } = props;
  return (
    <img
      src={restaurantImage || restaurantPhotoUrl || defaultRestaurantPhoto}
      alt="restaurant"
      className="restaurant-photo"
    />
  );
};

export default RestaurantPhoto;
