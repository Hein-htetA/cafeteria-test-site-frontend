import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { defaultImageUrl, outOfStockLarge } from "../utils/baseUrl";
import MenuDetailAddToCartBtn from "./MenuDetailAddToCartBtn";
import FullCart from "./MenuLoadingError/FullCart";
import "./PublicSingleMenuDetail.css";

const PublicSingleMenuDetail = () => {
  const { menuId, restaurantId } = useParams();

  const publicRestaurants = useSelector(
    (state) => state.publicData.publicRestaurants
  );

  const restaurant = publicRestaurants.find(
    (restaurant) => restaurant._id === restaurantId
  );

  const singleMenu = restaurant.menu.find((menu) => menu._id === menuId);

  const { name, price, description, menuPhotoUrl, category, outOfStock } =
    singleMenu;

  //to add to cart(it is required to extract restaurant name in cart)

  const navigate = useNavigate();
  const resetMenu = () => {
    navigate(`../${category}`);
  };
  return (
    <>
      <div className="detail-container">
        <h2 className="category-title" onClick={resetMenu}>
          {category === "curry"
            ? "rice & curries"
            : category === "sideDish"
            ? "side dishes"
            : category === "drink"
            ? "snacks & drinks"
            : "additionals"}
        </h2>
        <div className="image-info-container">
          {outOfStock && (
            <img
              src={outOfStockLarge}
              alt="out-of-stock"
              className="out-of-stock-large"
            />
          )}
          <div className="img-container">
            <img src={menuPhotoUrl || defaultImageUrl} alt="uploadImg" />
          </div>
          <div className="info-container">
            <div className="food-title-box">
              <input
                className={"food-title"}
                value={name}
                placeholder="Name"
                readOnly
              />
              <div className={"error-msg error-msg-hidden"}>required</div>
            </div>
            <div className="food-price-box">
              <div
                className={"price-postfix"}
                style={{
                  backgroundColor: "white",
                }}
              >
                <input
                  type={"number"}
                  className={"food-price"}
                  value={price}
                  placeholder="Price"
                  readOnly
                />
                <span className="postfix">MMK</span>
              </div>
              <div className={"error-msg error-msg-hidden"}>required</div>
            </div>
            <div className="textarea-container">
              <textarea
                className={"description"}
                value={description}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {restaurant.status === "open" && (
        <MenuDetailAddToCartBtn
          menu={singleMenu}
          restaurant={restaurant}
          outOfStock={outOfStock}
        />
      )}
      <FullCart />
    </>
  );
};

export default PublicSingleMenuDetail;
