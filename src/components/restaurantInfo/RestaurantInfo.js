import React from "react";
import { useParams } from "react-router-dom";
import "./RestaurantInfo.css";
import photo4 from "../../img/photo4.jpg";

const RestaurantInfo = () => {
  const { restaurantName } = useParams();
  return (
    <div className="restaurant-detail-info-container">
      <h2 className="restaurant-name-marketplace1">{restaurantName}</h2>
      <img src={photo4} alt="restaurant" className="restaurant-photo" />
      <div className="detail-info-grid">
        <div>Name</div>
        <div>:</div>
        <div>Shwe Latt Toe</div>
        <div>Phone No.</div>
        <div>:</div>
        <div>
          <input value={"0988888888"} />
          <input value={"0988888888"} />
        </div>
        <div>Address</div>
        <div>:</div>
        <div>
          loaren ispen lorasfd odsfafasd asjf das sadjf ad
          sdfasfasdfasdfsaffdafdasdsfaf
        </div>
        <div>Established In</div>
        <div>:</div>
        <div>2022</div>
        <div>Payment Methods</div>
        <div>:</div>
        <div>adfhfsadfsajfaslkjf;slakdjfasdf;asfash</div>
        <div>Delivery</div>
        <div>:</div>
        <div>Available</div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
