import React from "react";
import "./SingleMenu.css";

const SingleMenu = (props) => {
  const { name, imageUrl, price } = props;

  return (
    <>
      <div className="item-image-container">
        <img src={imageUrl} alt="mala" />
      </div>
      <div className="item-info-container">
        <h4 className="item-name">{name}</h4>
        <div className="item-price">{price} MMK</div>
      </div>
    </>
  );
};

export default SingleMenu;
