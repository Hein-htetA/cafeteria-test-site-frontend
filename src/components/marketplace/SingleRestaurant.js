import React from "react";
import "./SingleRestaurant.css";
import photo4 from "../../img/photo4.jpg";

const SingleRestaurant = () => {
  return (
    <div className="single-restaurant">
      <img src={photo4} alt="restaurant" />
      <div className="restaurant-info-container">
        <h4 className="restaurant-name-marketplace">T-food House</h4>
        <div className="restaurant-phone-number">0977733334 / 093435353543</div>
        <div className="restaurant-location">Insein YTU cafeteria</div>
      </div>
    </div>
  );
};

export default SingleRestaurant;
