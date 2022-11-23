import React from "react";
import "./SingleMenu.css";

const SingleMenu = (props) => {
  const { id, name, image, price } = props;

  return (
    <>
      <div className="item-image-container">
        <img src={image} alt="mala" />
      </div>
      <div className="item-info-container">
        <h4 className="item-name">{name}</h4>
        <div className="item-price">{price} MMK</div>
      </div>
    </>
  );
};

export default SingleMenu;
