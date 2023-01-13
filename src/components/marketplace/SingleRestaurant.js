import React from "react";
import "./SingleRestaurant.css";
import { defaultRestaurantPhoto } from "../utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SingleRestaurant = (props) => {
  const { name, firstPhone, secondPhone, address, restaurantPhotoUrl } = props;
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
        {/* <div className="restaurant-phone-number">
          <div className="single-phone">{`+95${firstPhone}`}</div>
          {secondPhone && (
            <>
              <span style={{ color: "black", fontSize: "1rem" }}>/</span>
              <div className="single-phone">{`+95${secondPhone}`}</div>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default SingleRestaurant;
