import React from "react";
import "./SingleMenu.css";

const SingleMenu = (props) => {
  const { id, name, image, price } = props;

  return (
    <div className="single-menu-container">
      <div className="item-img-container">
        <img src={image} alt="mala" />
      </div>
      <div className="item-info-container">
        <h4 className="item-name">{name}</h4>
        <div className="item-price">{price} MMK</div>
      </div>
    </div>
  );
};

export default SingleMenu;
