import React from "react";
import "./SingleMenu.css";
import myImg from "./img1.jpg";

const SingleMenu = (props) => {
  const { id, name, imgUrl, price } = props;

  return (
    <div className="single-menu-container">
      <div className="item-img-container">
        <img src={myImg} alt="mala" />
      </div>
      <div className="item-info-container">
        <h4 className="item-name">{name}</h4>
        <div className="item-price">{price} MMK</div>
      </div>
    </div>
  );
};

export default SingleMenu;
