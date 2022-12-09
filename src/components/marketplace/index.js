import React from "react";
import "./index.css";
import photo1 from "../../img/photo1.jpg";
import photo4 from "../../img/photo4.jpg";
import photo5 from "../../img/photo5.jpg";
import { Link } from "react-router-dom";
import { restaurantData } from "../../data";
import SingleRestaurant from "./SingleRestaurant";

const Marketplace = () => {
  return (
    <div className="restaurant-link-container">
      {restaurantData.map((restaurant) => {
        return (
          <Link
            key={restaurant.id}
            className="restaurant-link"
            to={`${restaurant.restaurantName}`}
          >
            <SingleRestaurant {...restaurant} />
          </Link>
        );
      })}
    </div>
  );
};

export default Marketplace;
