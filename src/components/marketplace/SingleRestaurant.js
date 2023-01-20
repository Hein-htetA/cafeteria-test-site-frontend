import React from "react";
import "./SingleRestaurant.css";
import {
  defaultRestaurantPhoto,
  restaurantClosedPhoto,
} from "../utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SingleRestaurant = (props) => {
  const { name, firstPhone, secondPhone, address, restaurantPhotoUrl, status } =
    props;
  return (
    <div className="single-restaurant">
      <img
        src={restaurantPhotoUrl || defaultRestaurantPhoto}
        alt="restaurant"
      />
      <div className="restaurant-info-container">
        <h4 className="restaurant-name-marketplace">
          <FontAwesomeIcon icon={faStar} style={{ marginRight: "3px" }} />
          {name}
          <FontAwesomeIcon icon={faStar} style={{ marginLeft: "3px" }} />
        </h4>
      </div>
      {status === "closed" && (
        <div className="restaurant-closed-container">
          <img src={restaurantClosedPhoto} alt="closed" />
        </div>
      )}
    </div>
  );
};

export default SingleRestaurant;
