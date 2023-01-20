import React from "react";
import { defaultImageUrl, outOfStockSmall } from "../utils/baseUrl";
import MenuDeleteLoading from "./MenuDelete/MenuDeleteLoading";
import "./SingleMenu.css";

const SingleMenu = (props) => {
  const { name, menuPhotoUrl, price, menuDeleteLoading, outOfStock } = props;

  return (
    <>
      {menuDeleteLoading && <MenuDeleteLoading />}
      <div className="item-image-container">
        <img src={menuPhotoUrl || defaultImageUrl} alt={name} />
        {outOfStock && (
          <img
            src={outOfStockSmall}
            alt="out-of-stock"
            className="outOfStock-img"
          />
        )}
      </div>
      <div className="item-info-container">
        <h4 className="item-name">{name}</h4>
        <div className="item-price">{price} MMK</div>
      </div>
    </>
  );
};

export default SingleMenu;
